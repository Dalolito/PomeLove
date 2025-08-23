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
    spanish?: string;
    english?: string;
  };
  buttons: {
    search_puppy: string;
    about_us: string;
    view_details: string;
    ask_about_puppy: string;
  };
  home: {
    available_now: string;
    availableDescription: string;
    viewAllPuppies: string;
    contactTitle: string;
    contactDescription: string;
    whatsappText: string;
    instagramText: string;
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
    location: string;
  };
  admin: {
    menu: string;
    puppys: string;
    categories: {
      title: string;
      subtitle: string;
      loading: string;
      description: string;
      editDescription: string;
      basicInfo: string;
      empty: {
        title: string;
        description: string;
        button: string;
      };
      fields: {
        name: string;
        minPrice: string;
      };
      placeholders: {
        name: string;
        minPrice: string;
      };
      headers: {
        name: string;
        minPrice: string;
        actions: string;
      };
      actions: {
        newCategory: string;
        edit: string;
        delete: string;
      };
      errors: {
        createFailed: string;
        updateFailed: string;
        deleteFailed: string;
      };
      deleteConfirmation: {
        title: string;
        message: string;
        warning: string;
        deleting: string;
      };
      filters: {
        title: string;
        clearFilters: string;
        searchLabel: string;
        searchPlaceholder: string;
        sortBy: string;
        sortByName: string;
        sortByPrice: string;
        sortOrder: string;
        ascending: string;
        descending: string;
        noResults: string;
        noResultsDescription: string;
      };
    };
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
        gender: string;
        category: string;
        fatherImage: string;
        motherImage: string;
        media: string;
      };
      placeholders: {
        name: string;
        description: string;
        gender: string;
        category: string;
      };
      gender: {
        male: string;
        female: string;
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
        gender: string;
        birthDate: string;
        description: string;
        available: string;
        actions: string;
      };
      actions: {
        newPet: string;
        view: string;
        edit: string;
        delete: string;
      };
      status: {
        available: string;
        unavailable: string;
      };
    };
    filters: {
      title: string;
      clearFilters: string;
      allCategories: string;
      allGenders: string;
      allStatuses: string;
      category: string;
      gender: string;
      availability: string;
      searchLabel: string;
      searchPlaceholder: string;
      noResults: string;
      noResultsDescription: string;
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
  catalog: {
    title: string;
    subtitle: string;
    loading: string;
    fromPrice: string;
    resultsCount: string;
    filtered: string;
    total: string;
    filters: {
      title: string;
      clearFilters: string;
      category: string;
      gender: string;
      availability: string;
      allCategories: string;
      allGenders: string;
      allAvailability: string;
      available: string;
      unavailable: string;
    };
  };
}
