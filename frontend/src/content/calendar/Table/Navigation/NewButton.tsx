import { useState } from "react";
import { Button } from "@/components/atoms/Button";
//import { NewEvent } from "../../EventRegister/NewEvent";
import { useSession } from "@/features/session/useSession";

export function NewButton() {
    const [isNewVisible, setIsNewVisible] = useState(false);
    const { logged } = useSession();

    return (
        <div className="flex items-center gap-2">
            {logged()
                ? (
                    <>
                        <Button
                            className="w-12 h-10 py-0"
                            onClick={() => setIsNewVisible(true)}
                        >
                            NEW
                        </Button>
                        {
                            /*isNewVisible
                            ? (
                                <NewEvent
                                    visible={isNewVisible}
                                    hide={() =>
                                        setIsNewVisible(false)}
                                    day={new Date()}
                                />
                            )
                                    : null*/
                        }
                    </>
                )
                : null}
        </div>
    );
}
