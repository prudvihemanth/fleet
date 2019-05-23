import { Component } from '@angular/core';
import { AppService } from './app.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Fleet Jira';
  showAlert = false;
  alertType = {};

  data;

  constructor(private apiService: AppService) { }

  ngOnInit() {
    this.apiService.getAllTickets()
      .subscribe((res) => {
        this.data = res;
      })

  }




  settings = {
    columns: {
      description: {
        title: 'Description'
      },
      feature: {
        title: 'Feature'
      },
      submittedBy: {
        title: 'Submitted By'
      },
      status: {
        title: 'Status'
      },
      priority: {
        title: 'Priority'
      },
      submittedDate: {
        title: 'Submitted Date',
        editable: false,
        valuePrepareFunction: (submittedDate) => {
          return new Date(submittedDate).getFullYear() + '-' + (new Date(submittedDate).getMonth() + 1) + '-' + new Date(submittedDate).getDate();
        }
      },
      modifiedDate: {
        title: 'Modified Date',
        editable: false,
        valuePrepareFunction: (modifiedDate) => {
          return new Date(modifiedDate).getFullYear() + '-' + (new Date(modifiedDate).getMonth() + 1) + '-' + new Date(modifiedDate).getDate();
        }
      }
    },
    edit: {
      confirmSave: true
    },
    actions: {
      add: false,
      delete: false
    },
  }

  close(alert) {
    console.log("closing")
  }

  resetAlert() {
    this.showAlert = false;
    this.alertType = {}
  }

  onSaveConfirm(event) {
    const priority = [1, 2, 3];
    const Status = ["COMPLETE", "IN_PROGRESS", "NOT_STARTED"]
    if (!priority.includes(event.newData.priority)) {
      this.showAlert = true;
      this.alertType = {
        type: 'danger',
        message: 'please enter valid priority value (1-3)',
      }
      setTimeout(() => this.resetAlert(), 5000);
      event.confirm.resolve(event.data);
    }
    else if (!Status.includes(event.newData.status)) {
      this.showAlert = true;
      this.alertType = {
        type: 'danger',
        message: 'please enter valid status value CAPS letters (COMPLETE, IN_PROGRESS, NOT_STARTED)',
      }
      setTimeout(() => this.resetAlert(), 5000);
      event.confirm.resolve(event.data);
    }
    else {
      this.apiService.updateTicket(event.newData)
        .subscribe((res) => {
          this.showAlert = true;
          this.alertType = {
            type: 'success',
            message: 'Successfully Updated the ticket',
          }
          setTimeout(() => this.resetAlert(), 5000);

        })
      event.confirm.resolve(event.newData);
    }
  }


};
