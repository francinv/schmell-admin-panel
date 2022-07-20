import React, { useState } from "react";
import { InputContainer, PersonRadioContainer, RadioContainer, SelectContainerSmall, TextAreaContainer } from "../../form";
import { useAppDispatch } from "../../../features/hooks";
import { postTask } from "../../../features/tasks/taskSlice";
import { resetStatistics } from '../../../features/statistics/statisticSlice';
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { selectTaskStatus } from "../../../features/tasks/taskSelectors";
import { useSelector } from "react-redux";
import { parseGamesToOptions, resetFields } from "../../../utils/taskUtil";
import { CATEGORY_OPTIONS, PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../../constants/taskConstants";
import { selectGames } from "../../../features/games/gameSelectors";
import ModalWrapper from '../../layout/ModalWrapper';
import BtnSubmit from "../../Buttons/BtnSubmit";
import FormOverlayWrapper from "../../layout/FormOverlayWrapper";

const actionDispatch = (dispatch) => ({
    addTask: (query) => dispatch(postTask(query)),
    resetStat: () => dispatch(resetStatistics())
});

const CreateTaskForm = ({open, handleShow}) => {
    const [values, setValues] = useState({
        title: '',
        description: '',
        status: 'P',
        deadline: '',
        category: '',
        priority: '',
        user_id: '',
        related_game: '',
    });

    const { addTask, resetStat } = actionDispatch(useAppDispatch());

    const status = useSelector(selectTaskStatus);
    const games = useSelector(selectGames);

    const isGameCategory = values.category === 'G';

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addTask(values);
        if (status === 'succeeded') {
            handleShow();
            resetStat();
            setValues(resetFields(values))
        }
    };

    return (
        <ModalWrapper open={open} handleClose={handleShow} modalTitle="Opprett oppgave">
            <FormOverlayWrapper handleSubmit={handleSubmit}>
                <InputContainer label="Tittel" placeholder="Skriv inn tittel.." onChange={handleChange('title')} value={values.title} type="text" />
                <TextAreaContainer label="Beskrivelse" placeholder="Beskriv oppgaven..." value={values.description} onChange={handleChange('description')} />
                <SelectContainerSmall label="Status:" value={values.status} onChange={handleChange('status')} options={STATUS_OPTIONS} width='65%' />
                <InputContainer label="Når er fristen?" value={values.deadline} onChange={handleChange('deadline')} type="datetime-local" />  
                <SelectContainerSmall label="Velg kategori:" value={values.category} onChange={handleChange('category')} options={CATEGORY_OPTIONS} width='65%'/>
                <RadioContainer label="Velg prioritet:" value={values.priority} onChange={handleChange('priority')} options={PRIORITY_OPTIONS} />
                <PersonRadioContainer label="Hvem er ansvarlig?" onChange={handleChange('user_id')} />
                { isGameCategory
                    ? <SelectContainerSmall label="Velg relatert spill:" value={values.related_game} onChange={handleChange('related_game')} options={parseGamesToOptions(games)} width='65%'/>
                    : null
                }
                <BtnSubmit btnText="Submit" endIcon={<AddCircleOutlineOutlined />}  />
            </FormOverlayWrapper>
        </ModalWrapper>
    );
};

export default CreateTaskForm;