export interface Dictionary {
  header: {
    title: string;
    subtitle: string;
    experience: string;
  };
  navigation: {
    home: string;
    catalog: string;
    about: string;
    gallery?: string;
    contact?: string;
    menu: string;
  };
  buttons: {
    search_puppy: string;
    about_us: string;
  };
  home: {
    available_now: string;
  };
  footer: {
    sections: {
      company: string;
      services: string;
    };
    links: {
      contact: string;
    };
    copyright: string;
  };
  admin: {
    menu: string;
    puppys: string;
    categories: string;
    subtitle: string;
    dashboard: string;
    management: string;
    settings: string;
    forms: {
      save: string;
      cancel: string;
      create: string;
      edit: string;
      delete: string;
      description: string;
      basicInfo: string;
      fields: {
        name: string;
        description: string;
        birthDate: string;
        category: string;
        fatherImage: string;
        motherImage: string;
        media: string;
      };
      placeholders: {
        name: string;
        description: string;
        category: string;
      };
      sections: {
        parents: string;
        parentsDescription: string;
      };
      errors?: {
        createFailed?: string;
        validationFailed?: string;
        [key: string]: string | undefined;
      };
    };
    media: {
      upload: {
        title: string;
        description: string;
        dropText: string;
        supportText: string;
        maxFilesText: string;
        uploadedFiles: string;
        removeFile: string;
        uploading: string;
        fileTypes: {
          image: string;
          video: string;
        };
        errors: {
          fileSize: string;
          fileType: string;
          maxFiles: string;
          uploadFailed?: string;
          [key: string]: string | undefined;
        };
      };
    };
    table: {
      title: string;
      subtitle: string;
      loading: string;
      empty: {
        title: string;
        description: string;
        button: string;
      };
      headers: {
        image: string;
        name: string;
        category: string;
        birthDate: string;
        description: string;
        media: string;
        actions: string;
      };
      actions: {
        newPet: string;
        view: string;
        edit: string;
        delete: string;
      };
    };
    utils: {
      age: {
        lessThanMonth: string;
        month: string;
        months: string;
        year: string;
        yearAndMonth: string;
        yearAndMonths: string;
        years: string;
        yearsAndMonth: string;
        yearsAndMonths: string;
      };
      fileSize: {
        zeroBytes: string;
        bytes: string;
        kb: string;
        mb: string;
        gb: string;
      };
    };
  };
}
