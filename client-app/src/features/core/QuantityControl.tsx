import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  index: number;
  value: number;
  onChange: (index: number, newValue: number) => void;
  step?: number;
  minValue?: number;
  maxValue?: number;
}

const QuantityControl = ({ index, value, onChange, step = 1, minValue = 0, maxValue }: Props) => {
  const onRemove = () => {
    if (value - step >= minValue) {
      onChange(index, value - step);
    }
  };

  const onAdd = () => {
    if (maxValue === undefined || value + step <= maxValue) {
      onChange(index, value + step);
    }
  };

  return (
    <>
      <IconButton color="primary" onClick={onRemove} sx={{ marginLeft: "1em" }}>
        <RemoveIcon />
      </IconButton>
      <span>{value}</span>
      <IconButton color="primary" onClick={onAdd}>
        <AddIcon />
      </IconButton>
    </>
  );
};

export default QuantityControl;
