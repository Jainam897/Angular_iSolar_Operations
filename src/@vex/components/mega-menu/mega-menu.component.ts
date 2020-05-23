import { Component, OnInit } from '@angular/core';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import { Icon } from '@visurel/iconify-angular';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icContacts from '@iconify/icons-ic/twotone-contacts';
import icAssessment from '@iconify/icons-ic/twotone-assessment';
import icBook from '@iconify/icons-ic/twotone-book';
import { PopoverRef } from '../popover/popover-ref';

export interface MegaMenuFeature {
  icon: Icon;
  label: string;
  route: string;
}

export interface MegaMenuPage {
  label: string;
  route: string;
}

@Component({
  selector: 'vex-mega-menu',
  templateUrl: './mega-menu.component.html'
})
export class MegaMenuComponent implements OnInit {

  features: MegaMenuFeature[] = [
    {
      icon: icLayers,
      label: 'Dashboard',
      route: '/'
    },
    {
      icon: icAssigment,
      label: 'AIO-Table',
      route: '/apps/aio-table'
    },
    {
      icon: icContactSupport,
      label: 'Country',
      route: '/apps/country'
    },
    {
      icon: icContactSupport,
      label: 'State',
      route: '/apps/state'
    },
    {
      icon: icContactSupport,
      label: 'City',
      route: '/apps/city'
    },

    {
      icon: icContactSupport,
      label: 'Calendar',
      route: '/apps/calendar/calendarmodule'
    },

    // {
    //   icon: icAssessment,
    //   label: 'Scrumboard',
    //   route: '/apps/scrumboard/1'
    // },
    // {
    //   icon: icBook,
    //   label: 'Documentation',
    //   route: '/documentation'
    // }
  ];

  pages: MegaMenuPage[] = [
    {
      label: 'AIO-Table',
      route: '/apps/aio-table'
    },
    // {
    //   label: 'Authentication',
    //   route: '/login'
    // },
    // {
    //   label: 'Components',
    //   route: '/ui/components/overview'
    // },
    // {
    //   label: 'Documentation',
    //   route: '/documentation'
    // },
    // {
    //   label: 'FAQ',
    //   route: '/pages/faq'
    // },
    // {
    //   label: 'Form Elements',
    //   route: '/ui/forms/form-elements'
    // },
    // {
    //   label: 'Form Wizard',
    //   route: '/ui/forms/form-wizard'
    // },
    // {
    //   label: 'Guides',
    //   route: '/pages/guides'
    // },
    {
      label: 'Country',
      route: '/apps/country'
    },

    {
      label: 'State',
      route: '/apps/state'
    },

    {
      label: 'City',
      route: '/apps/city'
    },

    {
      label: 'Calendar',
      route: '/apps/calendar'
    },

    // {
    //   label: 'Scrumboard',
    //   route: '/apps/scrumboard'
    // }
  ];

  constructor(private popoverRef: PopoverRef<MegaMenuComponent>) { }

  ngOnInit() {
  }

  close() {
    this.popoverRef.close();
  }
}
