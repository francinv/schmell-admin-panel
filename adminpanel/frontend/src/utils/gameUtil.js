import { formControlClasses } from "@mui/material";
import React from "react";
import { fetchQuestions, fetchWeeks } from "../core/APIfunctions";


export async function getCountOfQuestions(game) {

    let tempWeeks = await fetchWeeks(game.id);

    let count = 0;
    for (let i = 0; i<tempWeeks.length; i++)  {
        let week = tempWeeks[i];
        let temp = await fetchQuestions(week.id);
        count += temp.length;
    }

    return count;
}


