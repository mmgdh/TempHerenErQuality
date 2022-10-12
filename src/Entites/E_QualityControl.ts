export class IndexAllInfo {
    ClinicReactPercent = 0;
    patCountDatas = new Array<patCountData>()
    diseaseBubbleDatas = new Array<diseaseBubbleData>()
    PercentDatas = new Array<percentData>();
    diseLevelChartDatas = new Array<diseLevelChartData>()
    importantTimePats = new Array<importantTimePatCount>()
}

export class patCountData {
    CountType = '';
    CountNum = 0;
    CountPercent = '';
}

export class percentData {
    PercentType = '';
    PercentValue = '';
}

export class diseaseBubbleData {
    DiseaseName = '';
    DiseasePatCount = 0;
}

export class diseLevelChartData {
    LevelName = '';
    LevelCountValue = 0;
    LevelColor = '';
}

export class importantTimePatCount {
    ImportantTimeName = '';
    PatCount = '';
}