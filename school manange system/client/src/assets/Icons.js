import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'; import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import SchoolIcon from '@mui/icons-material/School';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CallIcon from '@mui/icons-material/Call';
import { Add } from '@mui/icons-material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
export const Icons = [
    {
        Icon: NotificationsNoneOutlinedIcon,
        path: '/',
        name: "Notifiçáo",
        title: "User info"
    },
    {
        Icon: MailOutlineIcon,
        path: '/',
        name: "Menssagens",
        title: "User info"
    },
]

export const sidbarIconsPrimary = [
    {
        Icon: WidgetsIcon,
        path: '/',
        name: "Principal",
        title: "User info"
    },
    {
        Icon: PeopleOutlinedIcon,
        path: '/professors',
        name: "professores",
        title: "User info"
    },
    {
        Icon: Diversity3OutlinedIcon,
        path: '/alunos',
        name: "Alunos",
        title: "User info"
    },
]

export const sidbarIconsSecond = [
    {
        Icon: EditNoteOutlinedIcon,
        path: '/notas',
        name: "Notas",
        title: "User info"
    },
    // {
    //     Icon: DragIndicatorOutlinedIcon,
    //     path: '/',
    //     name: "Pautas",
    //     title: "User info"
    // },

    {
        Icon: Add,
        path: '/cadastrar',
        name: "Cadastrar",
        title: "User info"
    },
    {
        Icon: AccountCircleIcon,
        path: '/account',
        name: "Sua conta",
        title: "User info"
    },
]


export const cadastrarIcons = [
    {
        Icon: GroupAddIcon,
        name: "professor",
        path: "professor",
        desc: 'existem 45 professores cadastrados'
    },
    {
        Icon: SchoolIcon,
        name: "aluno",
        path: "aluno",
        desc: 'existem 45 alunos cadastrados'
    },
]

export const analitycons = [

    {
        Icon: GroupAddIcon,
        name: "professor",
        path: "professor",
        desc: 'existem 45 professores cadastrados'
    },
    {
        Icon: SchoolIcon,
        name: "aluno",
        path: "cadastrar",
        desc: 'existem 45 alunos cadastrados'
    },
]

export const chatmessageheaderincos = [
    {
        Icon: CallIcon,
        name: "chamar",
        fnc: 'call'
    },
    {
        Icon: InfoOutlinedIcon,
        name: "informações",
        path: "/",
    },
    {
        Icon: CloseOutlinedIcon,
        name: "feichar janela",
        fnc: 'close'
    },
]