export type Language = 'en' | 'ar';

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    subname: string;
    fullName: string;
    tagline: string;
    badge: string;
  };
  topStrip: {
    operations: string;
    logistics: string;
    whatsapp: string;
    call: string;
    gmailStatus: string;
  };
  nav: {
    home: string;
    howItWorks: string;
    customer: string;
    driver: string;
    admin: string;
    tankers: string;
    features: string;
    about: string;
    orderNow: string;
    explore: string;
    bookDemo: string;
    menu: string;
    close: string;
    switchLang: string;
  };
  hero: {
    headline: string;
    highlight: string;
    subheadline: string;
    orderNowBtn: string;
    exploreBtn: string;
    bookDemoBtn: string;
    stats: {
      deliveryTime: string;
      deliveryTimeLabel: string;
      tankersCount: string;
      tankersCountLabel: string;
      satisfaction: string;
      satisfactionLabel: string;
      citiesCoverage: string;
      citiesCoverageLabel: string;
    };
    telemetry: {
      title: string;
      liveStatus: string;
      driverName: string;
      tankerType: string;
      waterVolume: string;
      eta: string;
      destination: string;
      dispatchedFrom: string;
      purifiedWater: string;
    };
    badges: {
      gccStandard: string;
      smartTracking: string;
      guaranteedETA: string;
    };
  };
  platformOverview: {
    tag: string;
    title: string;
    subtitle: string;
    roles: {
      customer: {
        title: string;
        desc: string;
        features: string[];
      };
      driver: {
        title: string;
        desc: string;
        features: string[];
      };
      admin: {
        title: string;
        desc: string;
        features: string[];
      };
    };
  };
  customerExperience: {
    tag: string;
    title: string;
    subtitle: string;
    steps: {
      step1: {
        num: string;
        title: string;
        desc: string;
        fields: {
          phone: string;
          phonePlaceholder: string;
          otp: string;
          address: string;
          addressSelect: string;
          tankType: string;
          groundTank: string;
          roofTank: string;
          hoseDistance: string;
        };
      };
      step2: {
        num: string;
        title: string;
        desc: string;
        options: {
          immediate: string;
          immediateDesc: string;
          scheduled: string;
          scheduledDesc: string;
        };
      };
      step3: {
        num: string;
        title: string;
        desc: string;
        trackingStates: {
          searching: string;
          found: string;
          enRoute: string;
          arrived: string;
          delivered: string;
        };
      };
    };
    orderFlowTrail: {
      label: string;
      steps: string[];
    };
  };
  orderNow: {
    tag: string;
    title: string;
    subtitle: string;
    instantPill: string;
    radarState: {
      searching: string;
      driverFound: string;
      onTheWay: string;
      delivered: string;
    };
    radarDesc: {
      searching: string;
      driverFound: string;
      onTheWay: string;
      delivered: string;
    };
    simulateBtn: string;
    resetBtn: string;
    callDriverBtn: string;
    orderNowModalBtn: string;
    dispatchedIn: string;
    estArrival: string;
  };
  scheduled: {
    tag: string;
    title: string;
    subtitle: string;
    selectDate: string;
    selectTimeSlot: string;
    days: {
      today: string;
      tomorrow: string;
      dayAfter: string;
      customDate: string;
    };
    slots: {
      slot1: string;
      slot2: string;
      slot3: string;
      slot4: string;
      slot5: string;
    };
    recurringLabel: string;
    recurringDesc: string;
    frequencies: {
      weekly: string;
      biweekly: string;
      monthly: string;
    };
    summaryLabel: string;
    confirmScheduleBtn: string;
    exampleText: string;
  };
  promotions: {
    tag: string;
    title: string;
    subtitle: string;
    autoOffersLabel: string;
    promoCodeLabel: string;
    applyBtn: string;
    appliedTag: string;
    codeAppliedMsg: string;
    codePlaceholder: string;
    seasonalOffer: {
      title: string;
      discount: string;
      cap: string;
      desc: string;
      autoBadge: string;
    };
    firstOrderOffer: {
      title: string;
      discount: string;
      desc: string;
      newCustomerBadge: string;
    };
  };
  payments: {
    tag: string;
    title: string;
    subtitle: string;
    secureLabel: string;
    instantReceipt: string;
    methods: {
      mada: string;
      visa: string;
      mastercard: string;
      applePay: string;
      googlePay: string;
      cod: string;
      codDesc: string;
    };
    corporateBilling: {
      title: string;
      desc: string;
      requestInvoiceBtn: string;
    };
  };
  liveTracking: {
    tag: string;
    title: string;
    subtitle: string;
    statusActive: string;
    driverDetailsTitle: string;
    telemetryMetrics: {
      speed: string;
      waterTemp: string;
      purity: string;
      hoseEquipped: string;
    };
    etaBadge: string;
    callDriver: string;
    chatWhatsApp: string;
    emergencyCall: string;
  };
  customerAccount: {
    tag: string;
    title: string;
    subtitle: string;
    tabs: {
      profile: string;
      history: string;
      addresses: string;
      paymentCards: string;
    };
    labels: {
      fullName: string;
      mobile: string;
      savedLocations: string;
      defaultAddress: string;
      loyaltyPoints: string;
      totalLitersDelivered: string;
      repeatOrderBtn: string;
      downloadReceipt: string;
    };
  };
  driverApp: {
    tag: string;
    title: string;
    subtitle: string;
    statusToggle: {
      online: string;
      offline: string;
    };
    activeOrderAlert: string;
    distanceAway: string;
    acceptBtn: string;
    declineBtn: string;
    orderActions: {
      onTheWay: string;
      arrived: string;
      pumping: string;
      delivered: string;
      callCustomer: string;
    };
    wallet: {
      title: string;
      subtitle: string;
      availableBalance: string;
      commissionHistory: string;
      requestPayout: string;
      sar: string;
      tripFare: string;
      platformFee: string;
      netEarned: string;
      todayTrips: string;
      todayRevenue: string;
    };
  };
  admin: {
    tag: string;
    title: string;
    subtitle: string;
    tabs: {
      orders: string;
      deliveries: string;
      revenue: string;
      fleet: string;
      drivers: string;
      scheduled: string;
      promotions: string;
      gmailHub: string;
    };
    metrics: {
      todayOrders: string;
      activeDeliveries: string;
      dailyRevenue: string;
      fleetOnline: string;
      driversOnline: string;
      scheduledBookings: string;
    };
    table: {
      orderId: string;
      customer: string;
      address: string;
      tanker: string;
      status: string;
      driver: string;
      amount: string;
      actions: string;
      viewDetails: string;
    };
  };
  workflow: {
    tag: string;
    title: string;
    subtitle: string;
    steps: {
      customer: {
        title: string;
        action: string;
        desc: string;
      };
      platform: {
        title: string;
        action: string;
        desc: string;
      };
      driverAccept: {
        title: string;
        action: string;
        desc: string;
      };
      driverDeliver: {
        title: string;
        action: string;
        desc: string;
      };
      adminMonitor: {
        title: string;
        action: string;
        desc: string;
      };
    };
  };
  tankers: {
    tag: string;
    title: string;
    subtitle: string;
    currency: string;
    perTrip: string;
    orderBtn: string;
    mostPopular: string;
    specs: {
      reach: string;
      pumpSpeed: string;
      idealForTitle: string;
    };
    models: {
      t10: {
        name: string;
        capacityTons: string;
        capacityLiters: string;
        desc: string;
        idealFor: string[];
      };
      t19: {
        name: string;
        capacityTons: string;
        capacityLiters: string;
        desc: string;
        idealFor: string[];
      };
      t32: {
        name: string;
        capacityTons: string;
        capacityLiters: string;
        desc: string;
        idealFor: string[];
      };
    };
  };
  whyNabaa: {
    tag: string;
    title: string;
    subtitle: string;
    points: Array<{
      title: string;
      desc: string;
    }>;
  };
  about: {
    tag: string;
    title: string;
    subtitle: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    standardsTitle: string;
    standardsDesc: string;
    citiesTitle: string;
    citiesList: string[];
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    customer: {
      title: string;
      subtitle: string;
      btn: string;
    };
    business: {
      title: string;
      subtitle: string;
      btn: string;
      demoBtn: string;
    };
  };
  footer: {
    brandDesc: string;
    quickLinks: string;
    fleetSolutions: string;
    contactUs: string;
    rights: string;
    saudiGCCNotice: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  orderModal: {
    title: string;
    subtitle: string;
    modeImmediate: string;
    modeScheduled: string;
    selectTanker: string;
    districtLabel: string;
    districtPlaceholder: string;
    contactPhone: string;
    waterType: string;
    sweetWater: string;
    rawWater: string;
    hoseRequirement: string;
    promoCode: string;
    apply: string;
    subtotal: string;
    vat: string;
    discount: string;
    totalPayable: string;
    confirmBtn: string;
    dispatchingTitle: string;
    dispatchingDesc: string;
    confirmedTitle: string;
    confirmedDesc: string;
    openGmailBtn: string;
    closeBtn: string;
  };
  demoModal: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    interestTopic: string;
    preferredTime: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    closeBtn: string;
  };
  contactWidget: {
    chatTitle: string;
    available247: string;
    whatsappLabel: string;
    callLabel: string;
    orderWaterLabel: string;
    close: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    meta: {
      title: 'The Nabaa Tankers | Water Delivery, Reimagined.',
      description: 'A connected digital water tanker delivery and fleet management platform connecting customers, drivers, and operations across Saudi Arabia and the GCC.'
    },
    brand: {
      name: 'The Nabaa',
      subname: 'Tankers',
      fullName: 'The Nabaa Tankers',
      tagline: 'Digital Water Logistics',
      badge: 'GCC Digital Water Platform'
    },
    topStrip: {
      operations: '24/7 Operations & Dispatch:',
      logistics: 'Instant Water Tanker Logistics',
      whatsapp: 'WhatsApp:',
      call: 'Call:',
      gmailStatus: 'Notifications Active'
    },
    nav: {
      home: 'Home',
      howItWorks: 'How It Works',
      customer: 'Customer',
      driver: 'Driver',
      admin: 'Admin',
      tankers: 'Tankers',
      features: 'Features',
      about: 'About',
      orderNow: 'Order Now',
      explore: 'Explore Platform',
      bookDemo: 'Book Demo',
      menu: 'Menu',
      close: 'Close',
      switchLang: 'العربية'
    },
    hero: {
      headline: 'Water Delivery, Reimagined.',
      highlight: 'Water Delivery, Reimagined.',
      subheadline: 'The Nabaa connects customers, drivers, tankers, and operations through one intelligent water delivery platform.',
      orderNowBtn: 'Order Now',
      exploreBtn: 'Explore The Platform',
      bookDemoBtn: 'Book Live Demo',
      stats: {
        deliveryTime: '18 min',
        deliveryTimeLabel: 'Average Express Arrival',
        tankersCount: '350+',
        tankersCountLabel: 'Connected Fleet in GCC',
        satisfaction: '99.4%',
        satisfactionLabel: 'On-Time Fulfillment Rate',
        citiesCoverage: '12+',
        citiesCoverageLabel: 'Cities Covered in KSA'
      },
      telemetry: {
        title: 'Live Tanker Telemetry',
        liveStatus: 'EN ROUTE DISPATCH',
        driverName: 'Captain Tariq Al-Mansoor',
        tankerType: 'Mercedes-Benz Actros 19T',
        waterVolume: '19,000 L Pure Sweet Water',
        eta: '6 mins (2.4 km away)',
        destination: 'Al-Nakheel District, Ground Reservoir',
        dispatchedFrom: 'North Supply Terminal #3',
        purifiedWater: 'Certified Potable (SASO Compliant)'
      },
      badges: {
        gccStandard: 'SASO & GCC Water Quality Certified',
        smartTracking: 'GPS Live Route Telemetry',
        guaranteedETA: 'Guaranteed On-Demand Dispatch'
      }
    },
    platformOverview: {
      tag: 'UNIFIED ECOSYSTEM',
      title: 'Three Dedicated Experiences, One Connected Platform',
      subtitle: 'Engineered specifically for the unique demands of municipal, commercial, and residential water distribution across the Arabian Gulf.',
      roles: {
        customer: {
          title: 'Customer Experience',
          desc: 'Effortless on-demand or scheduled water tanker ordering with transparent fixed pricing and live driver tracking.',
          features: ['One-tap immediate express re-order', 'Flexible scheduled calendar replenishment', 'Live GPS truck telemetry & ETA', 'Mada, Apple Pay & Cash on Delivery']
        },
        driver: {
          title: 'Driver Companion App',
          desc: 'Purpose-built for tanker operators on the road with turn-by-turn navigation, digital job manifests, and transparent earnings.',
          features: ['Instant trip broadcast & 1-tap accept', 'Optimized route navigation with hose specs', 'Digital customer delivery verification', 'Instant wallet balance & automated payouts']
        },
        admin: {
          title: 'Central Operations Command',
          desc: 'High-visibility fleet intelligence, order dispatching, driver compliance, revenue reporting, and customer communications.',
          features: ['Real-time live map of entire fleet', 'Dynamic surge pricing & promo management', 'Automated driver assignment algorithm', 'Comprehensive analytics & exportable manifests']
        }
      }
    },
    customerExperience: {
      tag: 'CUSTOMER JOURNEY',
      title: 'Order Water in a Few Simple Steps',
      subtitle: 'From sudden shortage to full reservoir refill in less than 20 minutes.',
      steps: {
        step1: {
          num: '01',
          title: 'Create an Account & Pin Location',
          desc: 'Register seamlessly with your mobile number, verify via instant SMS OTP, and pinpoint your exact ground or rooftop tank location.',
          fields: {
            phone: 'Mobile Number',
            phonePlaceholder: '+966 5X XXX XXXX',
            otp: 'Verification Code',
            address: 'Select Delivery Address',
            addressSelect: 'Al-Malqa Villa, Riyadh (Rooftop Tank)',
            tankType: 'Tank Specifications',
            groundTank: 'Ground Reservoir (Al-Khazan Al-Ardi)',
            roofTank: 'Rooftop Tank (Al-Khazan Al-Ulwi)',
            hoseDistance: 'Distance from road: ~30 meters'
          }
        },
        step2: {
          num: '02',
          title: 'Choose Tanker Size & Delivery Time',
          desc: 'Select from 10T, 19T, or 32T calibrated tankers and decide between immediate express dispatch or a future scheduled delivery.',
          options: {
            immediate: 'Order Now (Express)',
            immediateDesc: 'Dispatches the closest available tanker within 18 minutes.',
            scheduled: 'Schedule for Later',
            scheduledDesc: 'Choose your exact day and morning/afternoon delivery window.'
          }
        },
        step3: {
          num: '03',
          title: 'Live Telemetry & Smooth Delivery',
          desc: 'Watch your tanker move on the live radar, verify driver details, call directly, and confirm pumping completion with digital signature.',
          trackingStates: {
            searching: 'Searching for nearby tankers...',
            found: 'Driver Found',
            enRoute: 'On the Way',
            arrived: 'Arrived',
            delivered: 'Delivered'
          }
        }
      },
      orderFlowTrail: {
        label: 'Continuous End-to-End Flow:',
        steps: ['Address', 'Tanker Size', 'Delivery Time', 'Promotion', 'Payment', 'Driver Search', 'Order']
      }
    },
    orderNow: {
      tag: 'EXPRESS ON-DEMAND',
      title: 'Need Water Now?',
      subtitle: 'Instant dispatch algorithm locates the closest certified tanker in your district.',
      instantPill: 'LIVE RADAR DISPATCH',
      radarState: {
        searching: 'Searching for nearby tankers...',
        driverFound: 'Driver Found',
        onTheWay: 'On the Way',
        delivered: 'Delivered'
      },
      radarDesc: {
        searching: 'Pinging 14 certified tankers within 5km radius of your reservoir...',
        driverFound: 'Captain Tariq Al-Mansoor accepted your order with Tanker #402.',
        onTheWay: 'Tanker is cruising on King Fahd Rd. ETA: 6 mins (2.4 km).',
        delivered: '19,000 Liters pumped successfully. Digital delivery receipt signed.'
      },
      simulateBtn: 'Advance Simulation Step',
      resetBtn: 'Restart Radar Simulation',
      callDriverBtn: 'Call Driver Directly',
      orderNowModalBtn: 'Place Real Order Now',
      dispatchedIn: 'Dispatched in 2 min',
      estArrival: 'Arrival in ~18 min'
    },
    scheduled: {
      tag: 'RECURRING & FUTURE REFILLS',
      title: 'Schedule Water for Later',
      subtitle: 'Never run dry. Plan single deliveries or set automated weekly recurring tanker visits for villas, compounds, and job sites.',
      selectDate: '1. Select Delivery Date',
      selectTimeSlot: '2. Select Preferred Time Window',
      days: {
        today: 'Today',
        tomorrow: 'Tomorrow',
        dayAfter: 'Thursday',
        customDate: 'Pick Date from Calendar'
      },
      slots: {
        slot1: '07:00 AM – 08:30 AM (Early Morning)',
        slot2: '10:00 AM – 11:30 AM (Mid-Morning)',
        slot3: '01:00 PM – 02:30 PM (Afternoon)',
        slot4: '04:30 PM – 06:00 PM (Late Afternoon)',
        slot5: '08:00 PM – 09:30 PM (Evening Express)'
      },
      recurringLabel: 'Enable Automated Recurring Delivery',
      recurringDesc: 'Automatically reserve a tanker every week or month without re-ordering.',
      frequencies: {
        weekly: 'Weekly (Every Monday)',
        biweekly: 'Bi-Weekly (Every 14 Days)',
        monthly: 'Monthly Refill'
      },
      summaryLabel: 'Scheduled Summary:',
      confirmScheduleBtn: 'Confirm Scheduled Tanker Reservation',
      exampleText: 'Tomorrow at 10:00 AM'
    },
    promotions: {
      tag: 'SAVINGS & OFFERS',
      title: 'Better Orders. Better Offers.',
      subtitle: 'Transparent, competitive rates with automatic discounts applied at checkout or custom coupon vouchers.',
      autoOffersLabel: 'Active Automatic Promotions',
      promoCodeLabel: 'Have a Promotional Code?',
      applyBtn: 'Apply Code',
      appliedTag: 'ACTIVE DISCOUNT',
      codeAppliedMsg: 'Promotional code applied successfully!',
      codePlaceholder: 'e.g. WATERFAST',
      seasonalOffer: {
        title: 'Seasonal Water Offer',
        discount: '15% OFF',
        cap: 'Maximum discount: 30 SAR',
        desc: 'Applied automatically to all 19T and 32T residential & commercial orders this season.',
        autoBadge: 'AUTOMATIC AT CHECKOUT'
      },
      firstOrderOffer: {
        title: 'First Order Welcome Bonus',
        discount: '25 SAR OFF',
        desc: 'Instant deduction on initial delivery for newly registered phone numbers.',
        newCustomerBadge: 'NEW CUSTOMERS'
      }
    },
    payments: {
      tag: 'SMART CHECKOUT',
      title: 'Simple, Flexible Payments',
      subtitle: 'Pay securely using modern digital payment methods trusted across Saudi Arabia and the Gulf.',
      secureLabel: 'PCI-DSS Certified 256-Bit Encrypted Gateway',
      instantReceipt: 'Instant VAT Compliant E-Invoice Issued with ZATCA QR Code',
      methods: {
        mada: 'Mada (مدى)',
        visa: 'Visa',
        mastercard: 'Mastercard',
        applePay: 'Apple Pay',
        googlePay: 'Google Pay',
        cod: 'Cash on Delivery',
        codDesc: 'Pay driver directly in cash or through mobile POS card machine upon pump completion.'
      },
      corporateBilling: {
        title: 'Corporate Credit Accounts & Monthly Invoicing',
        desc: 'Contracting firms, facility managers, and compounds can establish 30-day corporate billing credit terms with consolidated monthly statements.',
        requestInvoiceBtn: 'Inquire About Corporate Fleet Billing'
      }
    },
    liveTracking: {
      tag: 'RADAR TELEMETRY',
      title: 'Real-Time Driver & Tanker Tracking',
      subtitle: 'Zero guesswork. Track your tanker GPS coordinates, pump pressure, and direct communication channels.',
      statusActive: 'LIVE TRUCK TRACKING',
      driverDetailsTitle: 'Assigned Driver & Tanker Specs',
      telemetryMetrics: {
        speed: 'Cruising: 42 km/h',
        waterTemp: 'Water Temp: 22°C',
        purity: 'Purity Index: 99.8% TDS Normal',
        hoseEquipped: 'Hose: 50m Heavy-Duty'
      },
      etaBadge: 'Expected Arrival: 6 mins',
      callDriver: 'Call Driver',
      chatWhatsApp: 'WhatsApp Chat',
      emergencyCall: 'Dispatcher Support'
    },
    customerAccount: {
      tag: 'SELF-SERVICE PORTAL',
      title: 'Comprehensive Customer Dashboard',
      subtitle: 'Manage saved ground & roof tank addresses, repeat previous orders in one click, and download official VAT tax invoices.',
      tabs: {
        profile: 'Account Details',
        history: 'Order History',
        addresses: 'Saved Addresses',
        paymentCards: 'Saved Payment Methods'
      },
      labels: {
        fullName: 'Account Holder:',
        mobile: 'Registered Mobile:',
        savedLocations: 'Saved Locations:',
        defaultAddress: 'Primary Delivery Location',
        loyaltyPoints: 'Water Loyalty Points:',
        totalLitersDelivered: 'Total Water Received:',
        repeatOrderBtn: '1-Click Repeat Order',
        downloadReceipt: 'Download VAT Invoice'
      }
    },
    driverApp: {
      tag: 'DRIVER EMPOWERMENT',
      title: 'Built for Drivers. Designed for the Road.',
      subtitle: 'Intuitive interface that allows tanker drivers to maximize daily earnings and navigate smoothly to customer reservoirs.',
      statusToggle: {
        online: 'Online (Accepting Orders)',
        offline: 'Offline (Shift Inactive)'
      },
      activeOrderAlert: 'NEW INCOMING WATER DELIVERY REQUEST',
      distanceAway: '2.8 km away • Ground Tank • Villa',
      acceptBtn: 'Accept Order',
      declineBtn: 'Decline',
      orderActions: {
        onTheWay: 'On the Way',
        arrived: 'Arrived at Location',
        pumping: 'Pumping in Progress',
        delivered: 'Delivered & Completed',
        callCustomer: 'Call Customer'
      },
      wallet: {
        title: 'Driver Digital Wallet',
        subtitle: 'Every Delivery. Every Earning.',
        availableBalance: 'Available Balance',
        commissionHistory: 'Commission History',
        requestPayout: 'Request Payout to Bank',
        sar: 'SAR',
        tripFare: 'Trip Fare',
        platformFee: 'Platform Commission (10%)',
        netEarned: 'Net Earned',
        todayTrips: 'Trips Completed Today:',
        todayRevenue: "Today's Gross Earnings:"
      }
    },
    admin: {
      tag: 'CENTRAL OPERATIONS COMMAND',
      title: 'The Command Center Behind Every Delivery',
      subtitle: 'Real-time telemetry, automated driver assignment algorithms, live customer bookings, and multi-tanker operations.',
      tabs: {
        orders: 'Orders',
        deliveries: 'Active Deliveries',
        revenue: 'Revenue',
        fleet: 'Fleet',
        drivers: 'Drivers',
        scheduled: 'Scheduled Orders',
        promotions: 'Promotions',
        gmailHub: 'Gmail Dispatch Hub'
      },
      metrics: {
        todayOrders: "Today's Orders",
        activeDeliveries: 'Active Deliveries',
        dailyRevenue: 'Daily Revenue',
        fleetOnline: 'Fleet Available',
        driversOnline: 'Drivers Online',
        scheduledBookings: 'Scheduled Deliveries'
      },
      table: {
        orderId: 'Order ID',
        customer: 'Customer & Address',
        address: 'Tank Type & District',
        tanker: 'Tanker Size',
        status: 'Live Status',
        driver: 'Assigned Driver',
        amount: 'Total (SAR)',
        actions: 'Actions',
        viewDetails: 'View Details'
      }
    },
    workflow: {
      tag: 'INTELLIGENT ARCHITECTURE',
      title: 'How The Connected Platform Works',
      subtitle: 'A high-efficiency logistical loop connecting customers to nearest available tankers.',
      steps: {
        customer: {
          title: 'Customer',
          action: 'Places Order',
          desc: 'Selects capacity (10T, 19T, 32T), chooses delivery time, and confirms delivery coordinates.'
        },
        platform: {
          title: 'Nabaa Platform',
          action: 'Finds Driver',
          desc: 'Smart routing algorithm selects nearest certified driver with appropriate hose length.'
        },
        driverAccept: {
          title: 'Driver',
          action: 'Accepts Order',
          desc: 'Driver receives instant push alert with turn-by-turn navigation directly to reservoir.'
        },
        driverDeliver: {
          title: 'Driver',
          action: 'Delivers Water',
          desc: 'Driver pumps certified potable water and obtains digital proof of delivery.'
        },
        adminMonitor: {
          title: 'Admin Operations',
          action: 'Monitors Operation',
          desc: 'Central command oversees delivery SLA, telemetry metrics, and financial settlement.'
        }
      }
    },
    tankers: {
      tag: 'CERTIFIED FLEET SPECIFICATIONS',
      title: 'Standardized Tanker Capacities for Every Need',
      subtitle: 'From compact residential villa deliveries to heavy commercial and agricultural projects.',
      currency: 'SAR',
      perTrip: '/ trip',
      orderBtn: 'Order This Tanker',
      mostPopular: 'MOST POPULAR',
      specs: {
        reach: 'Hose Reach:',
        pumpSpeed: 'Pump Rate:',
        idealForTitle: 'Ideal Applications:'
      },
      models: {
        t10: {
          name: 'Small Tanker',
          capacityTons: '10 Tons',
          capacityLiters: '10,000 Liters',
          desc: 'Agile maneuverability for residential alleys, rooftop tanks, and rapid emergency top-ups.',
          idealFor: ['Residential villas', 'Emergency top-ups', 'Rooftop water tanks', 'Small gardens']
        },
        t19: {
          name: 'Medium Tanker',
          capacityTons: '19 Tons',
          capacityLiters: '19,000 Liters',
          desc: 'The optimal balance of volume and accessibility for compounds, residential buildings, and clinics.',
          idealFor: ['Residential compounds', 'Commercial facilities', 'Swimming pools', 'Medium-sized requirements']
        },
        t32: {
          name: 'Large Tanker',
          capacityTons: '32 Tons',
          capacityLiters: '32,000 Liters',
          desc: 'Heavy-duty volume delivery engineered for maximum throughput, industrial sites, and farming reservoirs.',
          idealFor: ['Commercial buildings', 'Construction sites', 'Farms & agricultural lands', 'Industrial reservoirs']
        }
      }
    },
    whyNabaa: {
      tag: 'THE NABAA ADVANTAGE',
      title: 'Why Customers and Fleets Trust The Nabaa',
      subtitle: 'Transforming traditional water delivery into a modern, transparent, on-demand utility.',
      points: [
        {
          title: 'Fastest ETA in Gulf Cities',
          desc: 'Intelligent dispatch routes closest available tankers, reaching customer reservoirs in ~18 minutes on average.'
        },
        {
          title: 'Guaranteed Potable Water Purity',
          desc: 'All water sources are laboratory tested and conform to SASO (Saudi Standards) drinking water guidelines.'
        },
        {
          title: 'Transparent Fixed Pricing (SAR)',
          desc: 'No sudden price hikes or negotiation hassle. Upfront rates clearly stated with VAT compliant e-invoices.'
        },
        {
          title: 'Long-Reach Sanitary Hoses (40–60m)',
          desc: 'Equipped with food-grade high-pressure hoses to easily reach underground reservoirs and high rooftop tanks.'
        }
      ]
    },
    about: {
      tag: 'ABOUT THE NABAA',
      title: 'Empowering Water Distribution Across Saudi Arabia & GCC',
      subtitle: 'The Nabaa is Saudi Arabia’s premier digital water logistics network, connecting verified water suppliers, tanker operators, and end customers.',
      missionTitle: 'Our Mission',
      missionDesc: 'To ensure no home, business, or project ever experiences water shortages by digitizing tanker logistics with speed, safety, and transparency.',
      visionTitle: 'Our Vision',
      visionDesc: 'To be the GCC’s undisputed standard in intelligent municipal and commercial water delivery infrastructure.',
      standardsTitle: 'Quality & Regulatory Compliance',
      standardsDesc: 'Every tanker in The Nabaa fleet undergoes rigorous hygiene inspection, calibration, and driver identity verification.',
      citiesTitle: 'Active Coverage Areas',
      citiesList: ['Riyadh (All Districts)', 'Jeddah', 'Dammam & Khobar', 'Makkah Al-Mukarramah', 'Madinah Munawwarah', 'Al-Ahsa & Qatif', 'Tabuk', 'Abha & Khamis Mushait']
    },
    faq: {
      tag: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Common Inquiries About The Nabaa Platform',
      subtitle: 'Everything you need to know about ordering water, fleet onboarding, and operations.',
      items: [
        {
          question: 'What is The Nabaa?',
          answer: 'The Nabaa is a digital water tanker delivery and fleet management platform connecting customers, drivers, tankers, and business operations.'
        },
        {
          question: 'Can customers order water immediately?',
          answer: 'Yes. The "Order Now" experience is designed for immediate on-demand water delivery requests, dispatching nearby available drivers and tankers in real time subject to fleet availability.'
        },
        {
          question: 'Can customers schedule deliveries?',
          answer: 'Yes. Customers can select a future delivery date, time slot, destination tank type, and tanker volume to plan recurring or upcoming water replenishment with full calendar visibility.'
        },
        {
          question: 'Can customers use promo codes?',
          answer: 'Yes. The checkout supports both automated promotions (such as seasonal offers or new account credits) and custom promotional codes (like WATERFAST or SUMMER10) with instant calculation.'
        },
        {
          question: 'How do drivers receive orders?',
          answer: 'Drivers receive optimized incoming requests directly via the dedicated Driver App with customer details, tank location, hose requirements, distance, and estimated earnings with intuitive Accept/Decline actions.'
        },
        {
          question: 'Can drivers track their earnings?',
          answer: 'Yes. The Driver App features an integrated digital wallet, detailed commission history per delivery, and straightforward payout request management.'
        },
        {
          question: 'Can businesses manage multiple tankers?',
          answer: 'The platform is natively architected for fleet and tanker operations, allowing dispatchers to register, monitor, track compliance, and assign drivers across 10T, 19T, and 32T vehicles from the Admin Dashboard.'
        },
        {
          question: 'Can administrators create promotions?',
          answer: 'Yes. Business administrators can configure discount types (percentage or fixed), caps, minimum orders, validity dates, and customer segment eligibility directly from the central dashboard.'
        }
      ]
    },
    cta: {
      customer: {
        title: 'Need Water Delivered to Your Reservoir Right Now?',
        subtitle: 'Order in less than 60 seconds. A nearby tanker is ready to dispatch to your villa, compound, or facility.',
        btn: 'Order Water Now (Instant Dispatch)'
      },
      business: {
        title: 'Manage Tanker Fleet or Need Commercial Supply Contracts?',
        subtitle: 'Connect your tanker fleet, driver workforce, or schedule recurring bulk commercial water deliveries.',
        btn: 'Fleet Inquiries & Supply',
        demoBtn: 'Book Live Platform Demo'
      }
    },
    footer: {
      brandDesc: 'The Nabaa is an intelligent digital water tanker logistics and fleet management platform serving residential, commercial, and industrial clients throughout the Kingdom of Saudi Arabia and the GCC.',
      quickLinks: 'Quick Links',
      fleetSolutions: 'Fleet Solutions',
      contactUs: 'Direct Operations Hotline',
      rights: '© 2026 The Nabaa Tankers. All rights reserved.',
      saudiGCCNotice: 'Certified Potable Water Transport • Compliant with GCC & Saudi Standards (SASO)',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service'
    },
    orderModal: {
      title: 'Order Water Tanker',
      subtitle: 'Fast dispatch to your location across Saudi Arabia',
      modeImmediate: 'Immediate Express (18 min)',
      modeScheduled: 'Schedule for Later',
      selectTanker: 'Select Tanker Capacity',
      districtLabel: 'Delivery District / Location',
      districtPlaceholder: 'e.g. Al-Malqa, Riyadh • Gate 2',
      contactPhone: 'Contact Mobile Number',
      waterType: 'Water Certification & Quality',
      sweetWater: 'Purified Potable Sweet Water (Drinking/Domestic)',
      rawWater: 'Raw Construction/Agricultural Water',
      hoseRequirement: 'Hose Reach Requirement',
      promoCode: 'Promo Code (Optional)',
      apply: 'Apply',
      subtotal: 'Base Delivery Price:',
      vat: 'VAT (15% Included):',
      discount: 'Applied Discount:',
      totalPayable: 'Total Payable (SAR):',
      confirmBtn: 'Confirm & Dispatch Tanker Now',
      dispatchingTitle: 'Contacting Dispatch Terminal...',
      dispatchingDesc: 'Assigning nearest verified driver with requested tanker capacity.',
      confirmedTitle: 'Tanker Dispatched Successfully!',
      confirmedDesc: 'Your booking has been registered and dispatched. Driver details and ETA are being sent via SMS and Email.',
      openGmailBtn: 'Open in Gmail (thenabaatankers@gmail.com)',
      closeBtn: 'Close'
    },
    demoModal: {
      title: 'Schedule Live Platform Demo',
      subtitle: 'Book a 15-minute consultation with The Nabaa Operations & Fleet Technology team.',
      name: 'Full Name',
      email: 'Work Email',
      phone: 'Mobile Number',
      company: 'Company / Organization Name',
      interestTopic: 'Area of Primary Interest',
      preferredTime: 'Preferred Meeting Date & Window',
      submitBtn: 'Confirm & Schedule Demo',
      successTitle: 'Demo Request Confirmed!',
      successDesc: 'Thank you! Our operations team has received your request and will send a Google Meet calendar invitation.',
      closeBtn: 'Done'
    },
    contactWidget: {
      chatTitle: 'The Nabaa Live Operations',
      available247: 'Online 24/7 • Instant Dispatch',
      whatsappLabel: 'Chat with Dispatcher on WhatsApp',
      callLabel: 'Direct Call Hotline (+966)',
      orderWaterLabel: 'Request Tanker Now',
      close: 'Close'
    }
  },
  ar: {
    meta: {
      title: 'نبع | منصة رقمية متكاملة لتوصيل المياه وإدارة أسطول الصهاريج',
      description: 'منصة رقمية ذكية لخدمات نقل وتوصيل صهاريج المياه (وايت ماء) وإدارة الأسطول، تربط بين العملاء والسائقين وعمليات التشغيل في المملكة العربية السعودية ودول الخليج.'
    },
    brand: {
      name: 'The Nabaa',
      subname: 'نبع',
      fullName: 'The Nabaa Tankers | نبع لخدمات نقل المياه',
      tagline: 'منظومة لوجستية رقمية للمياه',
      badge: 'المنصة الخليجية الرقمية للمياه'
    },
    topStrip: {
      operations: 'مركز العمليات والتوجيه على مدار الساعة:',
      logistics: 'خدمات التوصيل الفوري لصهاريج المياه',
      whatsapp: 'واتساب:',
      call: 'اتصال مباشر:',
      gmailStatus: 'الإشعارات مفعلة'
    },
    nav: {
      home: 'الرئيسية',
      howItWorks: 'كيف تعمل المنصة',
      customer: 'تطبيق العميل',
      driver: 'تطبيق السائق',
      admin: 'لوحة التحكم',
      tankers: 'صهاريج المياه',
      features: 'المميزات',
      about: 'عن نبع',
      orderNow: 'اطلب الآن',
      explore: 'استكشف المنصة',
      bookDemo: 'طلب عرض تجريبي',
      menu: 'القائمة',
      close: 'إغلاق',
      switchLang: 'EN'
    },
    hero: {
      headline: 'نعيد تعريف توصيل المياه',
      highlight: 'نعيد تعريف توصيل المياه',
      subheadline: 'يربط نبع العملاء والسائقين وصهاريج المياه وعمليات التشغيل من خلال منصة رقمية متكاملة وذكية لتوصيل المياه.',
      orderNowBtn: 'اطلب الآن',
      exploreBtn: 'استكشف المنصة',
      bookDemoBtn: 'طلب عرض توضيحي مباشر',
      stats: {
        deliveryTime: '18 دقيقة',
        deliveryTimeLabel: 'متوسط سرعة التوصيل السريع',
        tankersCount: '+350',
        tankersCountLabel: 'صهريج متصل في الأسطول',
        satisfaction: '99.4%',
        satisfactionLabel: 'نسبة الالتزام بالمواعيد',
        citiesCoverage: '+12',
        citiesCoverageLabel: 'مدينة مخدومة بالمملكة'
      },
      telemetry: {
        title: 'بيانات التتبع المباشر للصهريج',
        liveStatus: 'الصهريج في مسار التوصيل',
        driverName: 'الكابتن طارق المنصور',
        tankerType: 'مرسيدس-بنز أكتروس 19 طن',
        waterVolume: '19,000 لتر مياه عذبة نقية',
        eta: '6 دقائق (على بعد 2.4 كم)',
        destination: 'حي النخيل، الخزان الأرضي',
        dispatchedFrom: 'محطة تزويد الشمال رقم 3',
        purifiedWater: 'مياه صالحة للشرب معتمدة (مطابقة لمواصفات ساسو)'
      },
      badges: {
        gccStandard: 'مياه مطابقة للمواصفات السعودية والخليجية',
        smartTracking: 'تتبع مباشر ولحظي عبر نظام GPS',
        guaranteedETA: 'وصول موثوق ومضمون عند الطلب'
      }
    },
    platformOverview: {
      tag: 'منظومة تقنية موحدة',
      title: 'ثلاث تجارب متخصصة، في منصة رقمية واحدة',
      subtitle: 'صُممت خصيصاً لتلبية متطلبات توزيع المياه السكنية والتجارية والصناعية في المملكة ودول الخليج العربي بأعلى كفاءة.',
      roles: {
        customer: {
          title: 'تجربة العميل',
          desc: 'طلب صهاريج المياه الفورية أو المجدولة بسهولة فائقة، مع أسعار ثابتة وشفافة وتتبع حي لمسار الصهريج.',
          features: ['طلب فوري سريع بضغطة زر واحدة', 'جدولة مرنة لمواعيد التعبئة القادمة', 'تتبع حي لموقع الشاحنة مع وقت الوصول المتوقع', 'دفع إلكتروني آمن عبر مدى، أبل باي أو نقداً']
        },
        driver: {
          title: 'تطبيق السائق',
          desc: 'مُهيأ خصيصاً لسائقي صهاريج المياه على الطريق مع ملاحة دقيقة خطوة بخطوة وإيصالات رقمية وأرباح واضحة.',
          features: ['إشعار فوري بالطلبات وقبول بلمسة واحدة', 'خرائط ملاحة محسنة مع مواصفات أطوال الخراطيم', 'تأكيد رقمي لإتمام تفريغ المياه عند الخزان', 'محفظة مالية فورية وسحب مستمر للأرباح']
        },
        admin: {
          title: 'لوحة التحكم والعمليات المركزية',
          desc: 'رؤية تشغيلية شاملة لكامل الأسطول، توجيه الطلبات، متابعة التراخيص، تقارير الإيرادات وتواصل مباشر مع العملاء.',
          features: ['خريطة حية تفاعلية لكامل صهاريج الأسطول', 'إدارة العروض الترويجية والخصومات الذكية', 'خوارزمية ذكية لتوجيه السائق الأقرب تلقائياً', 'تقارير مالية تفصيلية وسجلات ضريبية قابلة للتصدير']
        }
      }
    },
    customerExperience: {
      tag: 'رحلة العميل',
      title: 'اطلب المياه بخطوات بسيطة',
      subtitle: 'من الشعور بنقص المياه إلى تعبئة الخزان بالكامل في أقل من 20 دقيقة.',
      steps: {
        step1: {
          num: '01',
          title: 'إنشاء حساب وتحديد الموقع',
          desc: 'سجل برقم جوالك بسهولة، أدخل رمز التحقق الفوري، وحدد موقع خزانك الأرضي أو العلوي بدقة على الخريطة.',
          fields: {
            phone: 'رقم الجوال',
            phonePlaceholder: '05X XXX XXXX',
            otp: 'رمز التحقق',
            address: 'اختر عنوان التوصيل',
            addressSelect: 'فيلا حي الملقا، الرياض (خزان علوي)',
            tankType: 'مواصفات الخزان',
            groundTank: 'خزان أرضي',
            roofTank: 'خزان علوي',
            hoseDistance: 'المسافة من الشارع: حوالي 30 متراً'
          }
        },
        step2: {
          num: '02',
          title: 'اختر حجم صهريج المياه ووقت التوصيل',
          desc: 'اختر سعة الصهريج المناسبة لاحتياجك (10 أطنان، 19 طناً، أو 32 طناً) وحدد بين التوصيل الفوري السريع أو المجدول.',
          options: {
            immediate: 'اطلب الآن (توصيل فوري)',
            immediateDesc: 'توجيه أقرب صهريج مياه متاح لموقعك خلال 18 دقيقة.',
            scheduled: 'جدولة الطلب لوقت لاحق',
            scheduledDesc: 'حدد اليوم المناسب والفترة الصباحية أو المسائية المفضلة.'
          }
        },
        step3: {
          num: '03',
          title: 'تتبع مباشر وتوصيل آمن للمياه',
          desc: 'شاهد تحرك الصهريج على الخريطة التفاعلية، وتواصل مع السائق مباشرة، وتأكد من اكتمال التعبئة مع إيصال رقمي فوري.',
          trackingStates: {
            searching: 'جارٍ البحث عن صهاريج مياه قريبة...',
            found: 'تم العثور على سائق',
            enRoute: 'في الطريق',
            arrived: 'وصل السائق',
            delivered: 'تم التوصيل'
          }
        }
      },
      orderFlowTrail: {
        label: 'مسار الطلب المتكامل (من اليمين إلى اليسار):',
        steps: ['العنوان', 'حجم الصهريج', 'وقت التوصيل', 'العرض الترويجي', 'الدفع', 'البحث عن السائق', 'الطلب']
      }
    },
    orderNow: {
      tag: 'توصيل فوري سريع',
      title: 'تحتاج المياه الآن؟',
      subtitle: 'خوارزمية التوجيه الذكية تحدد موقع أقرب صهريج معتمد في حيك لتوصيل فوري.',
      instantPill: 'رادار التوجيه الحي',
      radarState: {
        searching: 'جارٍ البحث عن صهاريج مياه قريبة...',
        driverFound: 'تم العثور على سائق',
        onTheWay: 'السائق في الطريق',
        delivered: 'تم التوصيل'
      },
      radarDesc: {
        searching: 'يتم فحص 14 صهريجاً معتمداً ضمن نطاق 5 كم من خزانك...',
        driverFound: 'قبل الكابتن طارق المنصور طلبك بالصهريج رقم 402.',
        onTheWay: 'الصهريج يتحرك على طريق الملك فهد. وقت الوصول المتوقع: 6 دقائق (2.4 كم).',
        delivered: 'تم تفريغ 19,000 لتر في الخزان بنجاح وتوثيق التوصيل رقمياً.'
      },
      simulateBtn: 'الانتقال للخطوة التالية في المحاكاة',
      resetBtn: 'إعادة تشغيل رادار المحاكاة',
      callDriverBtn: 'الاتصال بالسائق مباشرة',
      orderNowModalBtn: 'تقديم طلب حقيقي الآن',
      dispatchedIn: 'توجيه خلال دقيقتين',
      estArrival: 'وصول خلال ~18 دقيقة'
    },
    scheduled: {
      tag: 'تعبئة مجدولة ودورية',
      title: 'جدولة توصيل المياه لوقت لاحق',
      subtitle: 'لا داعي للقلق من نفاد المياه. حدد موعداً مسبقاً أو فعّل التعبئة الدورية الأسبوعية للفلل والمجمعات والمشاريع.',
      selectDate: '1. اختر تاريخ التوصيل',
      selectTimeSlot: '2. اختر الفترة الزمنية المناسبة',
      days: {
        today: 'اليوم',
        tomorrow: 'غداً',
        dayAfter: 'الخميس',
        customDate: 'تحديد تاريخ من التقويم'
      },
      slots: {
        slot1: '07:00 ص – 08:30 ص (الصباح الباكر)',
        slot2: '10:00 ص – 11:30 ص (قبل الظهر)',
        slot3: '01:00 م – 02:30 م (بعد الظهر)',
        slot4: '04:30 م – 06:00 م (العصر)',
        slot5: '08:00 م – 09:30 م (الفترة المسائية)'
      },
      recurringLabel: 'تفعيل التوصيل الدوري التلقائي',
      recurringDesc: 'حجز صهريج تلقائياً كل أسبوع أو شهر دون الحاجة لإعادة الطلب في كل مرة.',
      frequencies: {
        weekly: 'أسبوعياً (كل اثنين)',
        biweekly: 'كل أسبوعين (كل 14 يوماً)',
        monthly: 'تعبئة شهرية منتظمة'
      },
      summaryLabel: 'ملخص الموعد المجدول:',
      confirmScheduleBtn: 'تأكيد حجز موعد صهريج المياه',
      exampleText: 'غدًا الساعة 10:00 صباحًا'
    },
    promotions: {
      tag: 'عروض وتوفير',
      title: 'طلبات أفضل. عروض أفضل.',
      subtitle: 'أسعار واضحة وتنافسية مع خصومات تلقائية تطبق عند الدفع، بالإضافة إلى قسائم ترويجية خاصة.',
      autoOffersLabel: 'العروض التلقائية المفعلة حالياً',
      promoCodeLabel: 'هل لديك رمز ترويجي؟',
      applyBtn: 'تطبيق الرمز',
      appliedTag: 'خصم مفعل',
      codeAppliedMsg: 'تم تطبيق الرمز الترويجي بنجاح!',
      codePlaceholder: 'مثال: WATERFAST',
      seasonalOffer: {
        title: 'عرض موسمي على المياه',
        discount: 'خصم 15%',
        cap: 'الحد الأقصى للخصم: 30 ريال',
        desc: 'يطبق تلقائياً على كافة طلبات الصهاريج المتوسطة والكبيرة السكنية والتجارية طوال هذا الموسم.',
        autoBadge: 'خصم تلقائي عند الدفع'
      },
      firstOrderOffer: {
        title: 'مكافأة الترحيب بالطلب الأول',
        discount: 'خصم 25 ريال',
        desc: 'خصم فوري على أول طلب توصيل لجميع أرقام الجوال الجديدة المسجلة في المنصة.',
        newCustomerBadge: 'للعملاء الجدد'
      }
    },
    payments: {
      tag: 'دفع رقمي آمن',
      title: 'طرق دفع سهلة ومرنة',
      subtitle: 'سدد قيمة طلبك بأمان عبر وسائل الدفع المعتمدة والأكثر استخداماً في المملكة ودول الخليج.',
      secureLabel: 'بوابة دفع مشفرة بمعايير PCI-DSS الآمنة عالمياً',
      instantReceipt: 'إصدار فوري لفاتورة ضريبية إلكترونية معتمدة مع رمز QR من هيئة الزكاة والضريبة والجمارك (ZATCA)',
      methods: {
        mada: 'مدى',
        visa: 'Visa',
        mastercard: 'Mastercard',
        applePay: 'Apple Pay',
        googlePay: 'Google Pay',
        cod: 'الدفع عند الاستلام',
        codDesc: 'ادفع للسائق مباشرة نقداً أو عبر جهاز نقاط البيع المحمول فور الانتهاء من تفريغ المياه.'
      },
      corporateBilling: {
        title: 'حسابات ائتمانية وفواتير شهرية للشركات',
        desc: 'نوفر لشركات المقاولات وإدارات المجمعات والمرافق تسهيلات دفع ائتمانية لمدة 30 يوماً مع كشوفات شهرية موحدة.',
        requestInvoiceBtn: 'طلب فتح حساب ائتماني للمنشآت'
      }
    },
    liveTracking: {
      tag: 'تتبع راداري لحظي',
      title: 'تتبع مباشر للسائق ومسار الصهريج',
      subtitle: 'وداعاً للانتظار المجهول. تابع إحداثيات موقع الشاحنة، وضغط المضخة، وتواصل مع السائق مباشرة.',
      statusActive: 'تتبع مباشر للصهريج',
      driverDetailsTitle: 'بيانات السائق المعتمد ومواصفات الصهريج',
      telemetryMetrics: {
        speed: 'السرعة الحالية: 42 كم/س',
        waterTemp: 'حرارة المياه: 22° مئوية',
        purity: 'مؤشر النقاوة: 99.8% أملاح مطابقة',
        hoseEquipped: 'الخرطوم: 50 متراً عالي الضغط'
      },
      etaBadge: 'وقت الوصول المتوقع: 6 دقائق',
      callDriver: 'اتصال بالسائق',
      chatWhatsApp: 'محادثة واتساب',
      emergencyCall: 'دعم العمليات'
    },
    customerAccount: {
      tag: 'بوابة العميل الرقمية',
      title: 'لوحة حساب العميل المتكاملة',
      subtitle: 'أدر عناوين خزاناتك المحفوظة، أعد طلب الصهريج بضغطة زر، وحمّل فواتيرك الضريبية المعتمدة في أي وقت.',
      tabs: {
        profile: 'بيانات الحساب',
        history: 'سجل الطلبات',
        addresses: 'العناوين المحفوظة',
        paymentCards: 'البطاقات ووسائل الدفع'
      },
      labels: {
        fullName: 'اسم صاحب الحساب:',
        mobile: 'رقم الجوال المسجل:',
        savedLocations: 'المواقع المحفوظة:',
        defaultAddress: 'موقع التوصيل الرئيسي',
        loyaltyPoints: 'نقاط مكافآت نبع:',
        totalLitersDelivered: 'إجمالي كميات المياه المستلمة:',
        repeatOrderBtn: 'إعادة الطلب بضغطة زر',
        downloadReceipt: 'تحميل الفاتورة الضريبية'
      }
    },
    driverApp: {
      tag: 'تمكين السائقين',
      title: 'مصمم للسائقين. ومهيأ للطريق.',
      subtitle: 'واجهة تشغيلية بديهية تتيح لسائقي الصهاريج تحقيق أعلى دخل يومي والتنقل بسلاسة إلى خزانات العملاء.',
      statusToggle: {
        online: 'متصل (جاهز لاستقبال الطلبات)',
        offline: 'غير متصل (خارج ساعات العمل)'
      },
      activeOrderAlert: 'طلب توصيل مياه جديد متاح بالقرب منك',
      distanceAway: 'يبعد 2.8 كم • خزان أرضي • فيلا سكنية',
      acceptBtn: 'قبول',
      declineBtn: 'رفض',
      orderActions: {
        onTheWay: 'في الطريق',
        arrived: 'وصلت',
        pumping: 'جارٍ تفريغ وضخ المياه',
        delivered: 'تم التوصيل',
        callCustomer: 'اتصل بالعميل'
      },
      wallet: {
        title: 'محفظة السائق الرقمية',
        subtitle: 'كل عملية توصيل. كل ريال.',
        availableBalance: 'الرصيد المتاح',
        commissionHistory: 'سجل العمولات',
        requestPayout: 'طلب تحويل الرصيد',
        sar: 'ريال',
        tripFare: 'أجرة التوصيل',
        platformFee: 'عمولة المنصة (10%)',
        netEarned: 'صافي الربح المستحق',
        todayTrips: 'الرحلات المكتملة اليوم:',
        todayRevenue: 'إجمالي أرباح اليوم:'
      }
    },
    admin: {
      tag: 'مركز التحكم والعمليات',
      title: 'مركز التحكم في كل عملية توصيل',
      subtitle: 'مراقبة لحظية لحركة الأسطول، توجيه ذكي للمركبات، متابعة حجوزات العملاء وإدارة عمليات نقل المياه المتعددة.',
      tabs: {
        orders: 'الطلبات',
        deliveries: 'عمليات التوصيل النشطة',
        revenue: 'الإيرادات',
        fleet: 'الأسطول',
        drivers: 'السائقون',
        scheduled: 'الطلبات المجدولة',
        promotions: 'العروض الترويجية',
        gmailHub: 'مركز إرسال Gmail'
      },
      metrics: {
        todayOrders: 'إجمالي طلبات اليوم',
        activeDeliveries: 'عمليات التوصيل النشطة',
        dailyRevenue: 'الإيراد اليومي',
        fleetOnline: 'الصهاريج المتاحة',
        driversOnline: 'السائقون المتصلون',
        scheduledBookings: 'الطلبات المجدولة'
      },
      table: {
        orderId: 'رقم الطلب',
        customer: 'العميل والعنوان',
        address: 'نوع الخزان والحي',
        tanker: 'حجم الصهريج',
        status: 'الحالة الحالية',
        driver: 'السائق المعين',
        amount: 'المبلغ (ريال)',
        actions: 'الإجراءات',
        viewDetails: 'عرض التفاصيل'
      }
    },
    workflow: {
      tag: 'منظومة التشغيل الذكية',
      title: 'كيف تعمل منصة نبع المتصلة',
      subtitle: 'حلقة لوجستية فائقة الكفاءة تربط العملاء بأقرب الصهاريج المتاحة في ثوانٍ معدودة.',
      steps: {
        customer: {
          title: 'العميل',
          action: 'يقدم الطلب',
          desc: 'يحدد الحجم المطلوب (10، 19، 32 طناً)، ويختار وقت التوصيل، ويؤكد موقع الخزان بدقة.'
        },
        platform: {
          title: 'منصة نبع',
          action: 'تبحث عن السائق',
          desc: 'خوارزمية التوجيه الذكية تختار أقرب سائق معتمد يمتلك خرطوم التوصيل بالطول المطلوب.'
        },
        driverAccept: {
          title: 'السائق',
          action: 'يقبل الطلب',
          desc: 'يتلقى السائق إشعاراً فورياً على تطبيقه مع خريطة ملاحة مباشرة إلى موقع الخزان.'
        },
        driverDeliver: {
          title: 'السائق',
          action: 'يوصل المياه',
          desc: 'يقوم السائق بتفريغ وضخ المياه النقية في الخزان ويوثق إتمام التوصيل رقمياً.'
        },
        adminMonitor: {
          title: 'الإدارة',
          action: 'تتابع العملية',
          desc: 'مركز العمليات يراقب الالتزام بوقت الوصول ومستوى الخدمة وتوثيق الفواتير.'
        }
      }
    },
    tankers: {
      tag: 'مواصفات صهاريج المياه المعتمدة',
      title: 'سعات قياسية مدروسة تلبي كافة الاحتياجات',
      subtitle: 'من خزانات الفلل والمنازل السكنية إلى المجمعات والمشاريع الإنشائية والزراعية الكبرى.',
      currency: 'ريال',
      perTrip: '/ رحلة',
      orderBtn: 'اطلب هذا الصهريج',
      mostPopular: 'الأكثر طلباً',
      specs: {
        reach: 'مدى الخرطوم:',
        pumpSpeed: 'سرعة الضخ:',
        idealForTitle: 'الاستخدامات المثالية:'
      },
      models: {
        t10: {
          name: 'صهريج صغير',
          capacityTons: '10 أطنان',
          capacityLiters: '10,000 لتر',
          desc: 'مرونة عالية وسهولة حركة داخل الأحياء السكنية الضيقة، وللخزانات العلوية والتعبئة الطارئة السريعة.',
          idealFor: ['الفلل السكنية', 'التعبئة الطارئة السريعة', 'الخزانات العلوية', 'الحدائق والمساحات الصغيرة']
        },
        t19: {
          name: 'صهريج متوسط',
          capacityTons: '19 طناً',
          capacityLiters: '19,000 لتر',
          desc: 'التوازن المثالي بين الحجم وسهولة الوصول للمجمعات السكنية والمباني والمسابح والعيادات.',
          idealFor: ['المجمعات السكنية', 'المرافق التجارية والعيادات', 'المسابح السكنية', 'الاحتياجات متوسطة الحجم']
        },
        t32: {
          name: 'صهريج كبير',
          capacityTons: '32 طناً',
          capacityLiters: '32,000 لتر',
          desc: 'كميات ضخمة مصممة لأعلى كفاءة في المواقع الإنشائية والمزارع والمستودعات والخزانات المركزية الكبرى.',
          idealFor: ['المباني التجارية الكبرى', 'المشاريع ومواقع البناء', 'المزارع والاستراحات', 'الخزانات الصناعية المركزية']
        }
      }
    },
    whyNabaa: {
      tag: 'ميزة نبع التنافسية',
      title: 'لماذا يثق العملاء وأصحاب الأساطيل في نبع؟',
      subtitle: 'تحويل خدمة توصيل المياه التقليدية إلى خدمة رقمية عصرية وشفافة ومتاحة عند الطلب.',
      points: [
        {
          title: 'أسرع وقت وصول في مدن الخليج',
          desc: 'توجيه ذكي لأقرب صهريج متاح، ليصل إلى خزان العميل في متوسط 18 دقيقة فقط.'
        },
        {
          title: 'مياه شرب نقية ومضمونة الجودة',
          desc: 'كافة مصادر المياه مفحوصة مخبرياً ومعتمدة وفق اشتراطات الهيئة السعودية للمواصفات والمقاييس (SASO).'
        },
        {
          title: 'أسعار واضحة وثابتة (بالريال)',
          desc: 'لا مساومات ولا زيادات مفاجئة في الأسعار. فواتير إلكترونية شفافة وشاملة لضريبة القيمة المضافة.'
        },
        {
          title: 'خراطيم صحية طويلة المدى (40–60 متراً)',
          desc: 'خراطيم صحية مخصصة لمياه الشرب ومقاومة للحرارة والضغط للوصول لأبعد الخزانات الأرضية والعلوية.'
        }
      ]
    },
    about: {
      tag: 'عن منصة نبع',
      title: 'تمكين وتطوير قطاع نقل وتوزيع المياه في المملكة والخليج',
      subtitle: 'نبع هي الشبكة الرقمية الرائدة في المملكة العربية السعودية، تجمع بين موردي المياه المعتمدين وسائقي الصهاريج والمستفيدين النهائيين.',
      missionTitle: 'رسالتنا',
      missionDesc: 'ضمان عدم انقطاع المياه عن أي منزل أو منشأة أو مشروع من خلال رقمنة خدمات نقل المياه بسرعة وأمان وشفافية.',
      visionTitle: 'رؤيتنا',
      visionDesc: 'أن نكون المعيار الخليجي الأول والرائد في البنية التحتية الرقمية الذكية لتوصيل المياه البلدية والتجارية.',
      standardsTitle: 'الجودة والاشتراطات النظامية',
      standardsDesc: 'يخضع كل صهريج مياه في أسطول نبع لفحص صحي دوري ومعايرة للعدادات والتحقق من هوية وتراخيص السائقين.',
      citiesTitle: 'مناطق التغطية والخدمة الفعالة',
      citiesList: ['الرياض (كافة الأحياء)', 'جدة', 'الدمام والخبر', 'مكة المكرمة', 'المدينة المنورة', 'الأحساء والقطيف', 'تبوك', 'أبها وخميس مشيط']
    },
    faq: {
      tag: 'الأسئلة الشائعة',
      title: 'ما هي منصة نبع؟ وكل ما ترغب في معرفته',
      subtitle: 'إجابات شاملة ومفصلة حول آلية طلب المياه، الانضمام للأسطول، والعمليات التشغيلية.',
      items: [
        {
          question: 'ما هي منصة نبع؟',
          answer: 'نبع هي منصة رقمية متخصصة لتوصيل صهاريج المياه وإدارة أسطول الناقلات، تربط بين العملاء في المنازل والمنشآت وسائقي الصهاريج وفرق التشغيل في منظومة واحدة متكاملة.'
        },
        {
          question: 'هل يمكن للعملاء طلب المياه بشكل فوري؟',
          answer: 'نعم. تتيح ميزة "اطلب الآن" التوصيل الفوري عند الطلب، حيث تبحث المنصة في ثوانٍ عن أقرب صهريج متاح في محيط موقعك لتوجيهه فوراً.'
        },
        {
          question: 'هل يمكن جدولة مواعيد التوصيل لوقت لاحق؟',
          answer: 'نعم بكل تأكيد. يمكن للعميل اختيار اليوم والفترة الزمنية وسعة الصهريج المطلوبة ونوع الخزان لجدولة التوصيل مسبقاً أو تفعيل التعبئة الدورية المنتظمة.'
        },
        {
          question: 'هل تتوفر رموز ترويجية وخصومات؟',
          answer: 'نعم. تدعم المنصة العروض التلقائية (مثل الخصم الموسمي أو مكافأة الحساب الجديد) بالإضافة إلى إدخال الرموز الترويجية المخصصة (مثل WATERFAST أو SUMMER10) لاحتساب الخصم فوراً.'
        },
        {
          question: 'كيف يتلقى السائقون طلبات التوصيل؟',
          answer: 'يستقبل السائقون الطلبات مباشرة عبر تطبيق السائق المخصص، موضحاً فيه تفاصيل موقع الخزان والمسافة وطول الخرطوم المطلوب وصافي الربح المقدر مع زري قبول أو رفض.'
        },
        {
          question: 'هل يستطيع السائق متابعة أرباحه؟',
          answer: 'نعم. يوفر تطبيق السائق محفظة مالية رقمية متكاملة، تسجل عمولة كل رحلة مكتملة وتتيح تقديم طلبات تحويل الأرباح إلى الحساب البنكي بسهولة.'
        },
        {
          question: 'هل يمكن للشركات وأصحاب الأساطيل إدارة صهاريج متعددة؟',
          answer: 'تم تصميم المنصة خصيصاً لدعم الأساطيل، حيث تمكّن الشركات من تسجيل صهاريجها بمختلف السعات (10، 19، 32 طناً)، وتتبع تراخيصها وتعيين السائقين ومراقبة العمليات من لوحة التحكم.'
        },
        {
          question: 'هل يستطيع المشرفون إنشاء حملات وعروض ترويجية؟',
          answer: 'نعم. تتيح لوحة التحكم لمديري المنظومة إنشاء عروض ترويجية بنسب مئوية أو مبالغ ثابتة، وتحديد الحدود القصوى وفترة الصلاحية والشرائح المستهدفة بكل مرونة.'
        }
      ]
    },
    cta: {
      customer: {
        title: 'تحتاج لتعبئة خزان المياه في منزلك أو منشأتك الآن؟',
        subtitle: 'اطلب صهريج المياه خلال أقل من 60 ثانية. أقرب صهريج معتمد في حيك مستعد للتحرك فوراً.',
        btn: 'اطلب صهريج مياه الآن (توصيل فوري)'
      },
      business: {
        title: 'تمتلك أسطول صهاريج أو تحتاج لعقود توريد تجارية؟',
        subtitle: 'انضم إلى شبكة نبع الرقمية، أو اطلب خدمات توريد مياه منتظمة لمشاريعك ومجمعاتك السكنية.',
        btn: 'استفسارات الأسطول والتوريد التجاري',
        demoBtn: 'طلب عرض توضيحي للمنصة'
      }
    },
    footer: {
      brandDesc: 'منصة نبع هي المنظومة الرقمية الرائدة في خدمات نقل وتوصيل صهاريج المياه وإدارة الأساطيل للقطاعات السكنية والتجارية والصناعية في المملكة العربية السعودية ودول الخليج العربي.',
      quickLinks: 'روابط سريعة',
      fleetSolutions: 'حلول الأسطول والشركات',
      contactUs: 'مركز العمليات المباشر',
      rights: '© 2026 The Nabaa Tankers | نبع لخدمات نقل المياه. جميع الحقوق محفوظة.',
      saudiGCCNotice: 'نقل مياه شرب معتمدة ومطابقة للاشتراطات القياسية السعودية والخليجية (SASO)',
      privacyPolicy: 'سياسة الخصوصية',
      termsOfService: 'شروط الخدمة'
    },
    orderModal: {
      title: 'طلب صهريج مياه',
      subtitle: 'توصيل سريع لموقع خزانك في كافة مناطق المملكة',
      modeImmediate: 'توصيل فوري سريع (18 دقيقة)',
      modeScheduled: 'جدولة لوقت لاحق',
      selectTanker: 'اختر سعة الصهريج',
      districtLabel: 'حي وموقع التوصيل',
      districtPlaceholder: 'مثال: حي الملقا، الرياض • بوابة رقم 2',
      contactPhone: 'رقم الجوال للتواصل والتأكيد',
      waterType: 'نوع ومواصفات المياه',
      sweetWater: 'مياه عذبة نقية صالحة للشرب والاستخدام المنزلي',
      rawWater: 'مياه غير صالحة للشرب (إنشائية / زراعية)',
      hoseRequirement: 'طول الخرطوم المطلوب للتفريغ',
      promoCode: 'رمز الخصم الترويجي (اختياري)',
      apply: 'تطبيق',
      subtotal: 'سعر التوصيل الأساسي:',
      vat: 'ضريبة القيمة المضافة (15% مشمولة):',
      discount: 'قيمة الخصم المطبق:',
      totalPayable: 'إجمالي المبلغ المستحق (ريال):',
      confirmBtn: 'تأكيد الطلب وتوجيه الصهريج الآن',
      dispatchingTitle: 'جارٍ الاتصال بمحطة التوجيه...',
      dispatchingDesc: 'يتم الآن تعيين أقرب سائق معتمد بالسعة المطلوبة لموقع خزانك.',
      confirmedTitle: 'تم توجيه صهريج المياه بنجاح!',
      confirmedDesc: 'تم تسجيل طلبك وتوجيه الصهريج. ستصلك بيانات السائق ووقت الوصول التقديري عبر رسالة نصية وبريد إلكتروني.',
      openGmailBtn: 'فتح في Gmail (thenabaatankers@gmail.com)',
      closeBtn: 'إغلاق'
    },
    demoModal: {
      title: 'طلب عرض توضيحي مباشر للمنصة',
      subtitle: 'احجز جلسة استشارية مدتها 15 دقيقة مع فريق العمليات والتقنية في نبع.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني للعمل',
      phone: 'رقم الجوال',
      company: 'اسم الشركة أو المنشأة',
      interestTopic: 'الاهتمام الأساسي بالمنصة',
      preferredTime: 'التاريخ والفترة المناسبة للاجتماع',
      submitBtn: 'تأكيد وجدولة موعد العرض',
      successTitle: 'تم تأكيد طلب العرض التوضيحي!',
      successDesc: 'شكراً لك! تلقى فريق العمليات طلبك وسيقوم بإرسال رابط اجتماع Google Meet عبر التقويم.',
      closeBtn: 'تم'
    },
    contactWidget: {
      chatTitle: 'مركز عمليات نبع المباشر',
      available247: 'متاح 24/7 • توجيه فوري للمياه',
      whatsappLabel: 'محادثة مسؤول التوجيه عبر واتساب',
      callLabel: 'اتصال هاتفي مباشر بمكتب العمليات',
      orderWaterLabel: 'طلب صهريج مياه فوري',
      close: 'إغلاق'
    }
  }
};
