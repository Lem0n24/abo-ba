import React, { useRef } from 'react';
import { BottomSheet as RootBottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

// interface IBottomSheetProps {
//   isOpen: boolean,
//   children: React.ReactNode,
//   onClose?: () => void,
//   blocking?: boolean
//   toggleShow?: (arg1: (prev: boolean) => boolean) => void
//   header?: React.ReactNode
//   footer?: React.ReactNode
//   snapPoints?: {
//     max?: number
//     min?: number
//   }
// }

const initState = {
  max: window.innerHeight * 0.95,
  min: window.innerHeight * 0.4,
};

/**
 * @default snapPoints = [window.innerHeight * 0.4, window.innerHeight * 0.95]
 */
const BottomSheet = (props) => {
  const {
    isOpen,
    onClose = () => {},
    children,
    blocking = true,
    snapPoints = initState,
    toggleShow,
    header,
    footer,
  } = props;

  const ref = useRef(null);
  const _snapPoints = {
    min: snapPoints.min || initState.min,
    max: snapPoints.max || initState.max,
  };

  const _toggleShow = (event) => {
    if (!toggleShow) {
      return;
    }

    const { type } = event;

    if (type === 'SNAP') {
      toggleShow((prev) => !prev);
    }
  };

  return (
    <RootBottomSheet
      open={isOpen}
      onDismiss={onClose}
      blocking={blocking}
      snapPoints={() => [_snapPoints.min, _snapPoints.max]}
      onSpringEnd={_toggleShow}
      initialFocusRef={ref}
      header={header}
      footer={footer}
    >
      {children}
    </RootBottomSheet>

  );
};

export default BottomSheet;
