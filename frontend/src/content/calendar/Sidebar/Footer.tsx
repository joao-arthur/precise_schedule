import clss from "classnames";
import { useState } from "react";
import endOfYesterday from "date-fns/endOfYesterday";
import isAfter from "date-fns/isAfter";
import { Button } from "@/components/atoms/button/Button";
//import { NewEvent } from "../EventRegister/NewEvent";
import { useSession } from "@/features/session/useSession";

type props = {
    readonly day: Date;
};

export function Footer({ day }: props) {
    const { logged } = useSession();
    const [isNewEventVisible, setIsNewEventVisible] = useState(false);

    return logged() && isAfter(day, endOfYesterday())
        ? (
            <div
                className={clss(
                    "flex justify-center m-1 scroll-px-24 py-3 border-t",
                    "border-gray-300 dark:border-gray-500",
                    "transition-colors duration-500",
                )}
            >
                <Button
                    className="w-9/12"
                    onClick={() =>
                        setIsNewEventVisible(!isNewEventVisible)}
                >
                    NEW EVENT
                </Button>
                {
                    /*isNewEventVisible
                    ? (
                        <NewEvent
                            visible={isNewEventVisible}
                            hide={() => setIsNewEventVisible(false)}
                            day={day}
                        />
                    )
                    : null*/
                }
            </div>
        )
        : null;
}
