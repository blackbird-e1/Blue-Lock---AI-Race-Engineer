import os
import tempfile

import irsdk
import pandas as pd
from fastapi import UploadFile


async def parse_ibt(
    file: UploadFile,
) -> pd.DataFrame:

    if not file.filename:
        raise ValueError(
            "No file uploaded."
        )

    if not file.filename.lower().endswith(".ibt"):
        raise ValueError(
            "Only IBT files are supported."
        )

    contents = await file.read()

    temp_path = None
    ibt = None

    try:
        with tempfile.NamedTemporaryFile(
            suffix=".ibt",
            delete=False,
        ) as temp:
            temp.write(contents)
            temp_path = temp.name

        ibt = irsdk.IBT()

        ibt.open(temp_path)

        dataframe = pd.DataFrame(
            {
                "lap": ibt.get_all("Lap"),
                "time": ibt.get_all("SessionTime"),
                "speed": ibt.get_all("Speed"),
                "throttle": ibt.get_all("Throttle"),
                "brake": ibt.get_all("Brake"),
                "gear": ibt.get_all("Gear"),
                "rpm": ibt.get_all("RPM"),
            }
        )

        # Temporary defaults until we discover
        # the real steering/sector channels
        dataframe["steering"] = 0
        dataframe["sector"] = 0

        # iRacing stores throttle/brake as ratios (0.0-1.0)
        # Blue Lock expects percentages (0-100)
        dataframe["throttle"] *= 100
        dataframe["brake"] *= 100

        if dataframe.empty:
            raise ValueError(
                "IBT file contains no telemetry data."
            )

        return dataframe

    except Exception as e:
        print("IBT parse error:", e)
        raise ValueError(
            "Invalid IBT file."
        )

    finally:
        if ibt:
            try:
                ibt.close()
            except Exception:
                pass

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)