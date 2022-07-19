def parseStatusToString(type):
    if (type == 'D'):
        return 'Utvikling'
    elif (type == 'R'):
        return 'Klar'
    elif (type == 'R'):
        return 'Deployed'

def parse_priority_to_string(priority):
    if (priority == 1):
        return 'Høy'
    elif (priority == 2):
        return 'Middels'
    elif (priority == 3):
        return 'Lav'