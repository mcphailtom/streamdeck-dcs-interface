import { ChangeEvent, useEffect, useState } from "react";
import StreamdeckApi from "../api/StreamdeckApi";

export interface TitleMonitorSettings {
    dcs_id_string_monitor: string;
    string_monitor_address: number;
    string_monitor_mask: number;
    string_monitor_shift: number;
    string_monitor_max_length: number;
}
export const defaultTitleMonitorSettings: TitleMonitorSettings = {
    dcs_id_string_monitor: "NONE",
    string_monitor_address: 0,
    string_monitor_mask: 0,
    string_monitor_shift: 0,
    string_monitor_max_length: 0
}

interface Props {
    sdApi: StreamdeckApi;
    setSettings: React.Dispatch<React.SetStateAction<TitleMonitorSettings>>;
}

function TitleMonitor({ sdApi, setSettings }: Props): JSX.Element {
    const [titleMonitorAddress, setTitleMonitorAddress] = useState(sdApi.buttonSettings.string_monitor_address);
    const [titleMonitorStrLen, setTitleMonitorStrLen] = useState(sdApi.buttonSettings.string_monitor_max_length);

    function handleTitleMonitorAddressChange(event: ChangeEvent<HTMLInputElement>) {
        const maxStringLength: number = parseInt(event.currentTarget.value);
        !isNaN(maxStringLength) && setTitleMonitorAddress(maxStringLength);
    }
    function handleTitleMonitorStrLenChange(event: ChangeEvent<HTMLInputElement>) {
        const maxStringLength: number = parseInt(event.currentTarget.value);
        !isNaN(maxStringLength) && setTitleMonitorStrLen(maxStringLength);
    }

    useEffect(() => {
        const updatedSettings: TitleMonitorSettings = {
            dcs_id_string_monitor: "STRING",
            string_monitor_address: titleMonitorAddress,
            string_monitor_mask: 0,
            string_monitor_shift: 0,
            string_monitor_max_length: titleMonitorStrLen
        };
        setSettings(updatedSettings);
    }, [titleMonitorAddress, titleMonitorStrLen])

    return (
        <div>
            <h2>DCS Title Monitor:</h2>
            <p>Set button title to the value of:</p>
            <input
                type="text"
                placeholder="Enter Control Reference"
                value={titleMonitorAddress}
                onChange={handleTitleMonitorAddressChange}
            />
            <span> </span>
            <input
                type="text"
                placeholder="Max Length"
                value={titleMonitorStrLen}
                onChange={handleTitleMonitorStrLenChange}
            />
        </div>
    );
}

export default TitleMonitor;