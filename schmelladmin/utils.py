
def get_game_status(type):
    status = ''
    if (type == 'D'):
        status = 'Utvikling'
    elif (type == 'R'):
        status = 'Klar'
    elif (type == 'R'):
        status = 'Deployed'
    return status