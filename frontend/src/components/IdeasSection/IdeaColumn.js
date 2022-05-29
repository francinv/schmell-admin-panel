import React, { useEffect } from "react";
import { Avatar, Box } from "@mui/material";
import { CARD_TEXT, H2 } from "../styles/Typography";
import { useSelector } from "react-redux";
import { selectGameIdeas, selectDevIdeas, selectDesignIdeas, selectVariousIdeas } from '../../features/ideas/ideaSelectors';
import { getBorderRight, getColor, getList } from "../../utils/ideaUtil";

const IdeaColumn = ({ categoryTitle, last }) => {

    const gameIdeas = useSelector(selectGameIdeas);
    const devIdeas = useSelector(selectDevIdeas);
    const designIdeas = useSelector(selectDesignIdeas);
    const variousIdeas = useSelector(selectVariousIdeas);

    useEffect(() => {
      getThisList();
    }, []);

    return (
        <Box
            sx={{
                width:'25%',
                borderRight: getBorderRight(last),
                paddingTop: '10px',
                paddingBottom: '10px',
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }}
        >
            <Box
                sx={{
                    display:'flex',
                    width: '90%',
                    marginBottom: '44.5px',
                    marginLeft:'auto',
                    marginRight: 'auto',
                    justifyContent: 'center',
                    backgroundColor: getColor(),
                }}
            >
                <H2>{categoryTitle}</H2>
            </Box>
            {getList(categoryTitle, gameIdeas, devIdeas, designIdeas, variousIdeas)
                .map((idea) => (
                    <Box
                        sx={{
                            width: '60%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            minHeight: '110px',
                            backgroundColor: getColor(categoryTitle),
                            display: 'flex',
                            marginTop: '5.5px',
                            marginBottom: '5.5px',
                            borderRadius: '8px',
                            padding:'5px 5px 5px 10px',
                            flexDirection: 'row',
                        }}
                        key={idea.id}
                    > 
                        <CARD_TEXT>{idea.text}</CARD_TEXT>
                        <Avatar
                            alt={idea.createdBy.username}
                            src={idea.createdBy.profile_picture}
                            sx= {{
                                width: 30,
                                height: 30,
                                marginTop: 'auto',
                                marginLeft: 'auto',
                            }}  
                        />
                    </Box>
            ))}
        </Box>
    );
}

export default IdeaColumn;