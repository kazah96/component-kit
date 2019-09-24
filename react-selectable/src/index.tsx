import * as React from "react";
import { arrayOf, oneOfType, func, node, number, bool } from "prop-types";
// import { debounce } from "lodash";
import { IProps, IState } from "./interface";

const DIRECTION_UP = 1;

const DIRECTION_DOWN = 2;

class SelectableList extends React.PureComponent<IProps, IState> {
  public get items(): React.ReactNode[] {
    return React.Children.toArray(this.props.children);
  }
  public static propTypes = {
    onSelectedItemChanged: func,
    onClickItem: func,
    notSelectByDefault: bool,
    delay: number,
    children: oneOfType([arrayOf(node), node])
  };

  public static defaultProps = {
    children: null,
    delay: 0,
    onSelectedItemChanged: () => null,
    onClickItem: () => null,
    notSelectByDefault: false
  };

  public state: IState;

  // public onSelectedItemChanged = debounce(
  //   this.props.onSelectedItemChanged,
  //   this.props.delay
  // );

  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedItemId: props.notSelectByDefault ? undefined : 0
    };
  }

  public onSelectedItemChanged = (item: any) => {
    this.props.onSelectedItemChanged(item);
  };

  public componentDidMount() {
    const { notSelectByDefault } = this.props;

    if (this.items.length !== 0 && !notSelectByDefault) {
      this.onSelectedItemChanged(this.items[0]);
    }

    this.registerKeyboardInput();
  }

  public componentWillUnmount() {
    this.unregisterKeyboardInput();
  }

  public onUserItemClick = (key: number) => {
    this.changeSelection(key);
  };

  public changeSelection = (key: number) => {
    this.setState({ selectedItemId: key }, () =>
      this.onSelectedItemChanged(this.items[key])
    );
  };

  public handleKeyboardInput = (event: any) => {
    if (event.keyCode === 40) {
      this.moveSelection(DIRECTION_DOWN);
    } else if (event.keyCode === 38) {
      this.moveSelection(DIRECTION_UP);
    }
  };

  public registerKeyboardInput = () => {
    document.addEventListener("keydown", this.handleKeyboardInput);
  };

  public unregisterKeyboardInput = () => {
    document.removeEventListener("keydown", this.handleKeyboardInput);
  };

  public moveSelection = (direction: number) => {
    const { selectedItemId } = this.state;
    if (selectedItemId === undefined) {
      return;
    }

    // вверх
    if (direction === DIRECTION_UP && selectedItemId > 0) {
      this.changeSelection(selectedItemId - 1);
    } else if (
      direction === DIRECTION_DOWN &&
      selectedItemId < this.items.length - 1
    ) {
      this.changeSelection(selectedItemId + 1);
    }
  };

  public render() {
    const { selectedItemId } = this.state;

    return this.items
      ? this.items.map((child, key) =>
          React.cloneElement(child as any, {
            onClick: () => this.onUserItemClick(key),
            isSelected: key === selectedItemId
          })
        )
      : null;
  }
}

export default SelectableList;
