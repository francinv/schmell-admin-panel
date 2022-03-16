from datetime import datetime

def get_seconds_of_delay(deadline):
    today = datetime.now()
    diff = deadline - today
    return int(diff.total_seconds() - 90000)