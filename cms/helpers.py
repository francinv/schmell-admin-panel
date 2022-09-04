from random import randint, random
from re import sub


def include_players(questionString: str):
    sub1 = 'N1'
    sub2 = 'N2'
    sub3 = 'N3'
    sub4 = 'N4'

    if sub1 in questionString or sub2 in questionString or sub3 in questionString or sub4 in questionString:
        return True
    return False

def switch_player(questionString: str, playerArray: list()):
    if not include_players(questionString):
        return questionString
    random_numbers = []
    for i in range(4):
        rand_int = randint(0, len(playerArray) - 1)
        while rand_int in random_numbers:
            rand_int = randint(0, len(playerArray) - 1)
        random_numbers.append(rand_int)

    return questionString.replace('N1', playerArray[random_numbers[0]]).replace('N2', playerArray[random_numbers[1]]).replace('N3', playerArray[random_numbers[2]]).replace('N4', playerArray[random_numbers[3]])