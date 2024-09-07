import request from '@/utils/request'
export const abpApplicationLocalization = {
  getApplicationLocalizations: function({ cultureName, onlyDynamics }) {
    return request({
      url: '/api/abp/application-localization',
      method: 'get',
      params: { cultureName, onlyDynamics }
    })
  }
}

export const callRecords = {
  createCallRecord: function(patientQueueId) {
    return request({
      url: '/api/app/call-records',
      method: 'post',
      data: { patientQueueId }
    })
  },
  getCallRecords: function({ patientQueueId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/call-records',
      method: 'get',
      params: { patientQueueId, sorting, skipCount, maxResultCount }
    })
  },
  updateCallRecord: function({ id, patientQueueId }) {
    return request({
      url: '/api/app/call-records/' + id,
      method: 'put',
      data: { patientQueueId }
    })
  },
  deleteCallRecord: function(id) {
    return request({
      url: '/api/app/call-records/' + id,
      method: 'delete'
    })
  },
  getCallRecord: function(id) {
    return request({
      url: '/api/app/call-records/' + id,
      method: 'get'
    })
  }
}

export const department = {
  createDepartment: function({ code, name, introduce }) {
    return request({
      url: '/api/app/department',
      method: 'post',
      data: { code, name, introduce }
    })
  },
  getDepartments: function({ filter, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/department',
      method: 'get',
      params: { filter, sorting, skipCount, maxResultCount }
    })
  },
  updateDepartment: function({ id, code, name, introduce }) {
    return request({
      url: '/api/app/department/' + id,
      method: 'put',
      data: { code, name, introduce }
    })
  },
  deleteDepartment: function(id) {
    return request({
      url: '/api/app/department/' + id,
      method: 'delete'
    })
  },
  getDepartment: function(id) {
    return request({
      url: '/api/app/department/' + id,
      method: 'get'
    })
  }
}

export const doctor = {
  createDoctor: function({ code, name, userName, phone, introduce, qualifications, title, major, license, certificate }) {
    return request({
      url: '/api/app/doctor',
      method: 'post',
      data: { code, name, userName, phone, introduce, qualifications, title, major, license, certificate }
    })
  },
  getDoctors: function({ filter, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/doctor',
      method: 'get',
      params: { filter, sorting, skipCount, maxResultCount }
    })
  },
  updateDoctor: function({ id, code, name, userName, phone, introduce, qualifications, title, major, license, certificate }) {
    return request({
      url: '/api/app/doctor/' + id,
      method: 'put',
      data: { code, name, userName, phone, introduce, qualifications, title, major, license, certificate }
    })
  },
  deleteDoctor: function(id) {
    return request({
      url: '/api/app/doctor/' + id,
      method: 'delete'
    })
  },
  getDoctor: function(id) {
    return request({
      url: '/api/app/doctor/' + id,
      method: 'get'
    })
  }
}

export const doctorScheduling = {
  createDoctorScheduling: function({ doctorName, startTime, endTime, departmentName, timeSlot, isExpert, price }) {
    return request({
      url: '/api/app/doctor-scheduling',
      method: 'post',
      data: { doctorName, startTime, endTime, departmentName, timeSlot, isExpert, price }
    })
  },
  getDoctorSchedulings: function({ doctorId, startTime, endTime, departmentId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/doctor-scheduling',
      method: 'get',
      params: { doctorId, startTime, endTime, departmentId, sorting, skipCount, maxResultCount }
    })
  },
  updateDoctorScheduling: function({ id, doctorId, startTime, endTime, departmentId, timeSlot, isExpert, price }) {
    return request({
      url: '/api/app/doctor-scheduling/' + id,
      method: 'put',
      data: { doctorId, startTime, endTime, departmentId, timeSlot, isExpert, price }
    })
  },
  deleteDoctorScheduling: function(id) {
    return request({
      url: '/api/app/doctor-scheduling/' + id,
      method: 'delete'
    })
  },
  getDoctorScheduling: function(id) {
    return request({
      url: '/api/app/doctor-scheduling/' + id,
      method: 'get'
    })
  }
}

export const patient = {
  createPatient: function({ patientId, outpatientNo, name, sex, age, phone, homeAddress, homePhone, contactsName, contactsRelation, contactsAddress, contactsPhone, career, nation, country }) {
    return request({
      url: '/api/app/patient',
      method: 'post',
      data: { patientId, outpatientNo, name, sex, age, phone, homeAddress, homePhone, contactsName, contactsRelation, contactsAddress, contactsPhone, career, nation, country }
    })
  },
  getPatients: function({ filter, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/patient',
      method: 'get',
      params: { filter, sorting, skipCount, maxResultCount }
    })
  },
  updatePatient: function({ id, patientId, outpatientNo, name, sex, age, phone, homeAddress, homePhone, contactsName, contactsRelation, contactsAddress, contactsPhone, career, nation, country }) {
    return request({
      url: '/api/app/patient/' + id,
      method: 'put',
      data: { patientId, outpatientNo, name, sex, age, phone, homeAddress, homePhone, contactsName, contactsRelation, contactsAddress, contactsPhone, career, nation, country }
    })
  },
  deletePatient: function(id) {
    return request({
      url: '/api/app/patient/' + id,
      method: 'delete'
    })
  },
  getPatient: function(id) {
    return request({
      url: '/api/app/patient/' + id,
      method: 'get'
    })
  }
}

export const patientQueue = {
  createPatientQueue: function({ queueInfoId, registrationRecordsId, sortNumber, state, callCount, signTime, memo }) {
    return request({
      url: '/api/app/patient-queue',
      method: 'post',
      data: { queueInfoId, registrationRecordsId, sortNumber, state, callCount, signTime, memo }
    })
  },
  getPatientQueues: function({ registrationRecordsId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/patient-queue',
      method: 'get',
      params: { registrationRecordsId, sorting, skipCount, maxResultCount }
    })
  },
  updatePatientQueue: function({ id, queueInfoId, registrationRecordsId, sortNumber, state, callCount, signTime, memo }) {
    return request({
      url: '/api/app/patient-queue/' + id,
      method: 'put',
      data: { queueInfoId, registrationRecordsId, sortNumber, state, callCount, signTime, memo }
    })
  },
  deletePatientQueue: function(id) {
    return request({
      url: '/api/app/patient-queue/' + id,
      method: 'delete'
    })
  },
  getPatientQueue: function(id) {
    return request({
      url: '/api/app/patient-queue/' + id,
      method: 'get'
    })
  }
}

export const queueAdjustRecords = {
  createQueueAdjustRecord: function({ patientQueueId, beforeSortNumber, afterSortNumber }) {
    return request({
      url: '/api/app/queue-adjust-records',
      method: 'post',
      data: { patientQueueId, beforeSortNumber, afterSortNumber }
    })
  },
  getQueueAdjustRecords: function({ patientQueueId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/queue-adjust-records',
      method: 'get',
      params: { patientQueueId, sorting, skipCount, maxResultCount }
    })
  },
  updateQueueAdjustRecord: function({ id, patientQueueId, beforeSortNumber, afterSortNumber }) {
    return request({
      url: '/api/app/queue-adjust-records/' + id,
      method: 'put',
      data: { patientQueueId, beforeSortNumber, afterSortNumber }
    })
  },
  deleteQueueAdjustRecord: function(id) {
    return request({
      url: '/api/app/queue-adjust-records/' + id,
      method: 'delete'
    })
  },
  getQueueAdjustRecord: function(id) {
    return request({
      url: '/api/app/queue-adjust-records/' + id,
      method: 'get'
    })
  }
}

export const queueInfo = {
  createQueueInfo: function({ name, departmentId, doctorId }) {
    return request({
      url: '/api/app/queue-info',
      method: 'post',
      data: { name, departmentId, doctorId }
    })
  },
  getQueueInfos: function({ name, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/queue-info',
      method: 'get',
      params: { name, sorting, skipCount, maxResultCount }
    })
  },
  updateQueueInfo: function({ id, name, departmentId, doctorId }) {
    return request({
      url: '/api/app/queue-info/' + id,
      method: 'put',
      data: { name, departmentId, doctorId }
    })
  },
  deleteQueueInfo: function(id) {
    return request({
      url: '/api/app/queue-info/' + id,
      method: 'delete'
    })
  },
  getQueueInfo: function(id) {
    return request({
      url: '/api/app/queue-info/' + id,
      method: 'get'
    })
  }
}

export const registrationRecords = {
  createRegistrationRecord: function({ patientId, no, departmentId, doctorId, visitTime, emgSign, serNum, source, price, resourceType }) {
    return request({
      url: '/api/app/registration-records',
      method: 'post',
      data: { patientId, no, departmentId, doctorId, visitTime, emgSign, serNum, source, price, resourceType }
    })
  },
  getRegistrationRecords: function({ filter, departmentName, doctorName, startTime, endTime, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/registration-records',
      method: 'get',
      params: { filter, departmentName, doctorName, startTime, endTime, sorting, skipCount, maxResultCount }
    })
  },
  updateRegistrationRecord: function({ id, patientId, no, departmentId, doctorId, visitTime, emgSign, serNum, source, price, resourceType }) {
    return request({
      url: '/api/app/registration-records/' + id,
      method: 'put',
      data: { patientId, no, departmentId, doctorId, visitTime, emgSign, serNum, source, price, resourceType }
    })
  },
  deleteRegistrationRecord: function(id) {
    return request({
      url: '/api/app/registration-records/' + id,
      method: 'delete'
    })
  },
  getRegistrationRecord: function(id) {
    return request({
      url: '/api/app/registration-records/' + id,
      method: 'get'
    })
  }
}

export const signRecord = {
  createSignRecord: function(registrationRecordsId) {
    return request({
      url: '/api/app/sign-record',
      method: 'post',
      data: { registrationRecordsId }
    })
  },
  getSignRecords: function({ registrationRecordsId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/sign-record',
      method: 'get',
      params: { registrationRecordsId, sorting, skipCount, maxResultCount }
    })
  },
  updateSignRecord: function({ id, registrationRecordsId }) {
    return request({
      url: '/api/app/sign-record/' + id,
      method: 'put',
      data: { registrationRecordsId }
    })
  },
  deleteSignRecord: function(id) {
    return request({
      url: '/api/app/sign-record/' + id,
      method: 'delete'
    })
  },
  getSignRecord: function(id) {
    return request({
      url: '/api/app/sign-record/' + id,
      method: 'get'
    })
  }
}

