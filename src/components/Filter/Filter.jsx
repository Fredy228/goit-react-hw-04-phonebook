import {Input, Label} from './Filter.styled';
import PropTypes from 'prop-types';

export const Filter = ({handleChangeFilter}) => {
    return (
        <Label>
            Find contacts by name
            <Input type='text' onChange={handleChangeFilter}/>
        </Label>
    )
}

Filter.propTypes = {
    handleChangeFilter: PropTypes.func
}