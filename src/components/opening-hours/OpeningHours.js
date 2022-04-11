/* eslint-disable default-case */
import React from 'react';
import {connect} from 'react-redux';
import GetResourceValue from '../../utils/LanguageResourceHelper';

const OpeningHours = ({mode,openingHours,resources,selectedLanguage}) => {
    var startIndex = 0,endIndex=0;
    const now = new Date();
    const dayOfWeek = now.getDay();
    const weekDays =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const data =[];
    switch(mode){
        case 0: //Current day
            startIndex = dayOfWeek;
            endIndex = startIndex;
            break;
        case 1: //After
            startIndex = dayOfWeek + 1;
            endIndex = 6;
            break;
        case 2: //Before
            startIndex = 0;
            endIndex = dayOfWeek - 1;
            break;
    }

    while(endIndex >= 0 && startIndex <= 6){

        var tempData = {
            key:`OpeningHours_${weekDays[startIndex]}`,
            openHours:openingHours.filter(item=>item.dayOfWeek === startIndex)
        };

        if(tempData.openHours.length === 0){//it determines if a day is closed or opened
            tempData.closed = true; //the day is closed unless the previous day was not closed before midnight
            if(startIndex === 0){//it is first day of the week
                var openingHoursOfOtherDays = openingHours.filter(item=>item.dayOfWeek !== startIndex);
                if(openingHoursOfOtherDays.length>0){
                    if(openingHoursOfOtherDays[openingHoursOfOtherDays.length-1].isStart){
                        tempData.closed = false;
                    }
                }
            }else{
                var openingHoursOfOtherDaysBefore = openingHours.filter(item=>item.dayOfWeek < startIndex);
                if(openingHoursOfOtherDaysBefore.length>0){
                    if(openingHoursOfOtherDaysBefore[openingHoursOfOtherDaysBefore.length-1].isStart){
                        tempData.closed = false;
                    }
                }
            }

        }else{
            tempData.closed = false;
        }

       

        data.push(tempData);

        if (mode === 0)//Current day
        {
            break;
        }
        else
        {
            startIndex++;
            if (mode === 2 && dayOfWeek === startIndex) //Before reached to current day
            {
                break;
            }
        }
    }

    return (
        <>
            {data.map(item=>{
                return<React.Fragment key={item.key}>
                <div className="row border-bottom m-3">
                    <div className="col-6 col-sm-6 col-md-6 p-3">
                        {GetResourceValue(resources,item.key)}
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 p-3">
                        {item.closed?(<span className="text-danger">{GetResourceValue(resources,"OpeningHours_Closed")}</span>):item.openHours.length===0?(<span className="text-success">{GetResourceValue(resources,"OpeningHours_Open")}</span>):null}
                        {item.openHours.map((openHour,openHourIndex)=>{
                            return<React.Fragment key={openHourIndex}>                            
                            <span>{openHour.isStart?(item.openHours.length -1 === openHourIndex?(`${GetResourceValue(resources,"OpeningHours_OpenAt")} ${openHour.time.hours.toString().padStart(2, '0')}:${openHour.time.minutes.toString().padStart(2, '0')}`):(`${openHour.time.hours.toString().padStart(2, '0')}:${openHour.time.minutes.toString().padStart(2, '0')}`) ):(openHourIndex === 0?`${GetResourceValue(resources,"OpeningHours_Open")}`:"")}</span>                           
                            <span>{openHour.isStart?"":(<><span> <i className="fas fa-arrow-right text-primary"></i> </span>{`${openHour.time.hours.toString().padStart(2, '0')}:${openHour.time.minutes.toString().padStart(2, '0')}`}<br></br><br></br></>)}</span>
                            
                            </React.Fragment>
                        })}
                    </div>
                </div>
                </React.Fragment>
            })}
        </>
    )
}

const mapStateToProps = ({language: {    
     resources,
     selectedLanguage   
  }}) => {
  return {    
    resources,
    selectedLanguage
  };
};

export default connect(mapStateToProps)(OpeningHours);
