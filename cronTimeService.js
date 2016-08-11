var schedule = require('node-schedule');
var timeHelper = require('./timeHelper');
var dateHelper = require('./dateHelper');
var heaterService = require('./heaterService');
var dateHelper = require('./dateHelper');

var _ = require('lodash');
var minsBeforeFloat = 0;
var cronJobs = [];
exports.appointmentsModel = [];

exports.addCal = function(appointmentsRaw){
    var appointments = timeHelper.grabAppointments(appointmentsRaw);
    if(!appointments){
        console.log('appointments was null');
        clearOldJobs();
    } else if(!_.isEqual(this.appointmentsModel, appointments)){
        clearOldJobs();
        this.appointmentsModel = appointments;
        console.log('appointments', this.appointmentsModel);
        if(this.appointmentsModel){
            for(var i =0;i<this.appointmentsModel.length;i++){
                console.log(i);
                cronJobs.push({
                    jobName:'job'+i,
                    jobId: this.appointmentsModel[i].id,
                    jobRun: jobStartTime(this.appointmentsModel[i].startTime),
                    jobEnd: jobEndTime(this.appointmentsModel[i].endTime)
                });
            }
        }
    }
};

function clearOldJobs(){
    cronJobs.forEach(function(job){
        if(job.jobRun){
            job.jobRun.cancel();
        }
        if(job.jobEnd){
            job.jobEnd.cancel();
        }
    });
    cronJobs = [];
}

jobStartTime = function(startTime){
    var job = null;
    console.log('job start time',startTime);
    var cronStartTime = dateHelper.dateOffsetFix(startTime.getTime() - minsBeforeFloat*60*1000);
    return schedule.scheduleJob(cronStartTime, function(){
        heaterService.turnOn();
    });
};

jobEndTime = function(endTime){
    console.log('job end time', endTime);
    var job = null;
    var cronEndTime = dateHelper.dateOffsetFix(endTime.getTime());
    return schedule.scheduleJob(cronEndTime, function(){
        heaterService.turnOff();
    });
};