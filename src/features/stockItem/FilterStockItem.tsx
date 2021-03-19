import {
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  Theme,
  MenuItem,
} from "@material-ui/core";
import { ISelectInputOptions } from "model/Common.model";
import { ChangeEvent, FC } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    "& .MuiOutlinedInput-input": {
      padding: "10px 14px",
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface IProps {
  stockTypeOptions: ISelectInputOptions[];
  stockType: number;
}
const FilterStockItem: FC<IProps> = ({ stockTypeOptions, stockType }) => {
  const classes = useStyles();

  console.log(stockType);
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    //setStockType(event.target.value as number);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Stock Type</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={stockType}
        onChange={handleChange}
        label="Stock Type"
      >
        {stockTypeOptions.map((option) => (
          <MenuItem value={option.value} key={option.key}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterStockItem;
