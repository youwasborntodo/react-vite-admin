// import Mock from 'mockjs'
import service from '@/utils/fetch';
import MockAdapter from 'axios-mock-adapter';
import { login, getUserList, getRoleList, addUser, editUser, deleteUser, deleteRole, editRole, addRole } from './user'
import { getAreaList, addArea, deleteArea, editArea } from './area';
import { getTrainerList, addTrainer, deleteTrainer, editTrainer } from './trainer';
import { getOrderList, getTableList } from './home'

if (import.meta.env.MODE === 'mock') {
    const mock = new MockAdapter(service, { delayResponse: 600 });

    mock.onPost(/\/oauth\/token/).reply(login);
    // mock.onGet(/\/userinfo/).reply(userInfo);
    mock.onGet(/\/getuserList/).reply(getUserList);
    mock.onGet(/\/getRoleList/).reply(getRoleList);
    mock.onPost(/\/addUser/).reply(addUser);
    mock.onPost(/\/editUser/).reply(editUser);
    mock.onPost(/\/deleteUser/).reply(deleteUser);
    mock.onPost(/\/addRole/).reply(addRole);
    mock.onPost(/\/editRole/).reply(editRole);
    mock.onPost(/\/deleteRole/).reply(deleteRole);
    mock.onGet(/\/getOrderList/).reply(getOrderList);
    mock.onGet(/\/tabledata/).reply(getTableList);
    
    
    // areaManage api mock
    mock.onGet(/\/getAreaList/).reply(getAreaList);
    mock.onPost(/\/addArea/).reply(addArea);
    mock.onPost(/\/deleteArea/).reply(deleteArea);
    mock.onPost(/\/editArea/).reply(editArea);
    
    // trainerManage api mock
    mock.onGet(/\/getTrainerList/).reply(getTrainerList);
    mock.onPost(/\/addTrainer/).reply(addTrainer);
    mock.onPost(/\/deleteTrainer/).reply(deleteTrainer);
    mock.onPost(/\/editTrainer/).reply(editTrainer);
}


// export default Mock;
