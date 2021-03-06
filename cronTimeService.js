var schedule = require('node-schedule');
var timeHelper = require('./timeHelper');
var heaterService = require('./heaterService');
var _ = require('lodash');

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
                    jobRun: jobStartTime(this.appointmentsModel[i].startTime,this.appointmentsModel[i].endTime),
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

jobStartTime = function(startTime,endTime){
    var job = null;
    console.log('job start time',startTime);
    var thirtyMinsBeforeStart = new Date(startTime);
    return schedule.scheduleJob(thirtyMinsBeforeStart, function(){
        var fromCalendar = true;
        heaterService.turnOn(endTime, fromCalendar);
    });
};

jobEndTime = function(endTime){
    var job = null;
    console.log('job end time', endTime);
    return schedule.scheduleJob(endTime, function(){
        heaterService.turnOff();
    });
};
