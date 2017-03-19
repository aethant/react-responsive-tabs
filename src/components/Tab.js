import React, { PureComponent, PropTypes } from 'react';
import cs from 'classnames';

function onTabClick(selected, onClick, originalKey) {
  return () => !selected && onClick(originalKey);
}

export default class Tab extends PureComponent {
  shouldComponentUpdate(nextProps) {
    return this.props.children !== nextProps.children ||
      this.props.selected !== nextProps.selected ||
      this.props.classNames !== nextProps.classNames;
  }

  render() {
    const {
      id,
      classNames,
      selected,
      disabled,
      panelId,
      onClick,
      onFocus,
      onBlur,
      originalKey,
      children,
      closable,
      ClosableBtn,
    } = this.props;
    return (
      <div
        ref={e => (this.tab = e)}
        role="tab"
        className={closable ? cs('closable-tab', classNames) : classNames}
        id={id}
        aria-selected={selected ? 'true' : 'false'}
        aria-expanded={selected ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-controls={panelId}
        tabIndex="0"
        onClick={onTabClick(selected, onClick, originalKey)}
        onFocus={onFocus(originalKey)}
        onBlur={onBlur}
      >
        <div className="Tab--label">
          <span className="Tab--label__text">{children}</span>
          { closable ? <span className="Tab--label__btn"><ClosableBtn /></span> : <span /> }
        </div>
      </div>
    );
  }
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,

  // generic props
  panelId: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  closable: PropTypes.bool,
  ClosableBtn: PropTypes.func,
  originalKey: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  classNames: PropTypes.string.isRequired,
};

Tab.defaultProps = {
  closable: false,
  ClosableBtn: () => <span />,
  children: undefined,
  disabled: false,
};
