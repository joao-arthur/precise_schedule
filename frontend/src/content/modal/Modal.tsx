import ReactDOM from "react-dom";
import { ModalComponent, modalProps } from "./ModalComponent";

export type props = modalProps & {
    readonly visible: boolean;
};

export function Modal(
    { children, visible, ...props }: props,
) {
    if (!visible) return null;
    const modalRoot = document.getElementById("modal");
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <ModalComponent {...props}>{children}</ModalComponent>,
        modalRoot,
    );
}
