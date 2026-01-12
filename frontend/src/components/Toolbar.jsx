import "./Toolbar.css";
import Button from "./Button";
import SearchBox from "./SearchBox";

const Toolbar = ({
  textValue,
  onTextChange,
  onBack,
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
        <Button onClick={onBack} size="small" label="Terug" variant="default" />
        {!hideTodayButton && (
          <Button
            onClick={onToday}
            size="small"
            label="Vandaag"
            variant="info"
          />
        )}
        <Button onClick={onNew} size="small" label="Nieuw" variant="success" />
        <Button onClick={onFilter} size="small" label="Filter" variant="info" />
        <Button onClick={onReset} size="small" label="Reset" variant="error" />
      </div>
    </div>
  );
};

export default Toolbar;
