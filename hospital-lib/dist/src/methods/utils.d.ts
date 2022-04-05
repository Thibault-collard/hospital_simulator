export declare function resetReportState(report_state: {
    [key: string]: number;
}): {
    [key: string]: number;
};
export declare function modifyReportState(report_state: {
    [key: string]: number;
}, ltrBefore: string, ltrAfter: string, countModify: number): {
    [key: string]: number;
};
export declare function findDrugInListDrugs(drugLtr: string): {
    "ltr": string;
    "name": string;
    "efficient_for": string;
    "state_after": string;
    "mixDrugs": {
        "mixedWithDrugltr": string;
        "newStateltr": string;
        "currentHealthStatusltr"?: undefined;
    };
    "description"?: undefined;
} | {
    "ltr": string;
    "description": string;
    "efficient_for": string;
    "state_after": string;
    "mixDrugs": {
        "mixedWithDrugltr": string;
        "currentHealthStatusltr": string;
        "newStateltr": string;
    };
    "name"?: undefined;
} | {
    "ltr": string;
    "description": string;
    "efficient_for": string;
    "state_after": string;
    "mixDrugs": {
        "mixedWithDrugltr": string;
        "currentHealthStatusltr": string;
        "newStateltr"?: undefined;
    };
    "name"?: undefined;
} | {
    "ltr": string;
    "description": string;
    "efficient_for": string;
    "state_after": string;
    "mixDrugs": {
        "mixedWithDrugltr": string;
        "newStateltr": string;
        "currentHealthStatusltr"?: undefined;
    };
    "name"?: undefined;
};
export declare function countBatchPatients(prescription: {
    [key: string]: any;
}): number;
export declare function findCoupleDrugs(prescription: {
    [key: string]: any;
}, mainDrug: string, sideEffect: string): any;
export declare function drugIsInDescr(prescription: {
    [key: string]: any;
}, mainDrug: string): any;
