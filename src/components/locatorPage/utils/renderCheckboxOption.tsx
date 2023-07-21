import * as React from "react";

interface CheckboxOption {
  id: string,
  label: string
}

export interface CheckboxOptionCssClasses {
  option?: string,
  optionLabel?: string,
  optionInput?: string
}

interface CheckBoxOptionProps {
  option: CheckboxOption,
  onClick: (isChecked: boolean) => void,
  selected?: boolean,
  customCssClasses?: CheckboxOptionCssClasses
}

const builtInCssClasses: CheckboxOptionCssClasses = {
  option: 'flex items-center space-x-3',
  optionInput: 'form-checkbox Filter-checkbox',
  optionLabel: 'Filter'
}

export default function renderCheckboxOption({
  option, selected, onClick, customCssClasses
}: CheckBoxOptionProps) {
  const cssClasses = { ...builtInCssClasses, ...customCssClasses };
  return (
    <label className={cssClasses.optionLabel} key={option.id} htmlFor={option.id}>
      <input 
        type="checkbox"
        id={option.id}
        checked={selected}
        className={cssClasses.optionInput}
        onChange={evt => onClick(evt.target.checked)}
      />
      <span className='Filter-text'></span>{option.label}</label>
  );
}
