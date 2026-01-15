import "./Toolbar.css";
import Button from "./Button";
import SearchBox from "./SearchBox";

const Toolbar = ({
  textValue,
  onTextChange,
  onToday,
  hideTodayButton = true,
  onNew,
  onFilter,
  onReset,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-search">
        <SearchBox
          size="big"
          value={textValue}
          placeholder="Leverancier of Inhoud"
          onChange={onTextChange}
        />
      </div>
      <div className="toolbar-actions">
        {!hideTodayButton && (
          <Button
            onClick={onToday}
            size="smedium"
            label="Vandaag"
            variant="info"
          />
        )}
        <Button onClick={onNew} size="smedium" label="Nieuw" />
        <Button
          onClick={onFilter}
          size="smedium"
          label="Filter"
          variant="info"
        />
        <Button
          onClick={onReset}
          size="smedium"
          label="Reset Filters"
          variant="error"
        />
      </div>
    </div>
  );
};

export default Toolbar;
