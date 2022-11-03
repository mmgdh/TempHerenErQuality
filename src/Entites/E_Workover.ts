export class ErWorkover {
    erReceiveClinicCounts = new Array<ErReceiveClinicCount>()
    erRescuePercents = new Array<ErRescuePercent>();
}

export class ErReceiveClinicCount {
    xName = '';
    lstCountPat = Array<number>()
}

export class ErRescuePercent {
    Date = '';
    AllPatCount = 0;
    RescuePatCount = 0;
}