import pandas as pd
from fastapi import UploadFile


async def parse_ibt(
    file: UploadFile,
) -> pd.DataFrame:
    raise NotImplementedError(
        "IBT parsing not implemented yet."
    )