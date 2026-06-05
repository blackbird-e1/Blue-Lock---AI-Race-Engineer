import pandas as pd
from fastapi import UploadFile

from .telemetry_schema import REQUIRED_COLUMNS
from .ibt_parser import parse_ibt

async def parse_csv(file: UploadFile) -> pd.DataFrame:
    if not file.filename:
        raise ValueError("No file uploaded.")

    if not file.filename.endswith(".csv"):
        raise ValueError("Only CSV files are supported.")

    contents = await file.read()

    try:
        from io import StringIO
        dataframe = pd.read_csv(StringIO(contents.decode("utf-8")))
    except Exception as e:
        print("CSV parse error:", e)
        raise ValueError("Invalid CSV file.")

    columns = set(dataframe.columns.str.strip())

    missing = REQUIRED_COLUMNS - columns

    if missing:
        missing_list = ", ".join(sorted(missing))
        raise ValueError(f"Missing required columns: {missing_list}")

    if dataframe.empty:
        raise ValueError("CSV file contains no telemetry data.")

    return dataframe

async def parse_telemetry_file(
    file: UploadFile,
) -> pd.DataFrame:

    if not file.filename:
        raise ValueError(
            "No file uploaded."
        )

    filename = file.filename.lower()

    if filename.endswith(".csv"):
        return await parse_csv(file)

    if filename.endswith(".ibt"):
        return await parse_ibt(file)

    raise ValueError(
        "Only CSV and IBT files are supported."
    )