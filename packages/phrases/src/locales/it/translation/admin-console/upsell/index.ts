import paywall from './paywall.js';

const upsell = {
  upgrade_plan: 'Aggiorna piano',
  compare_plans: 'Confronta i piani',
  view_plans: 'Visualizza piani',
  create_tenant: {
    title: 'Seleziona il piano del tenant',
    description:
      'Logto offre opzioni competitive di piani con una struttura dei prezzi innovativa e conveniente progettata per le aziende in crescita. <a>Scopri di più</a>',
    base_price: 'Prezzo base',
    monthly_price: '{{value, number}}/mese',
    mau_unit_price: 'Prezzo unitario MAU',
    view_all_features: 'Visualizza tutte le funzionalità',
    select_plan: 'Seleziona <name/>',
    free_tenants_limit: 'Fino a {{count, number}} tenant gratuito',
    free_tenants_limit_other: 'Fino a {{count, number}} tenant gratuiti',
    most_popular: 'Più popolare',
    upgrade_success: 'Aggiornamento a <name/> effettuato con successo',
  },
  mau_exceeded_modal: {
    title: 'MAU ha superato il limite. Aggiorna il tuo piano.',
    notification:
      'Il tuo MAU attuale ha superato il limite di <planName/>. Aggiorna al piano premium tempestivamente per evitare la sospensione del servizio Logto.',
    update_plan: 'Aggiorna piano',
  },
  payment_overdue_modal: {
    title: 'Pagamento della fattura in ritardo',
    notification:
      "Oops! Il pagamento della fattura dell'affittuario <span>{{name}}</span> è fallito. Si prega di pagare tempestivamente la fattura per evitare la sospensione del servizio Logto.",
    unpaid_bills: 'Fatture non pagate',
    update_payment: 'Aggiorna pagamento',
  },
  charge_notification_for_quota_limit:
    'Hai raggiunto il tuo limite di quota. Possiamo aggiungere addebiti per funzionalità che superano il limite di quota come componenti aggiuntivi, una volta che finalizziamo i prezzi.',
  charge_notification_for_token_limit:
    'Hai raggiunto il limite di quota di {{value}}M token. Possiamo aggiungere addebiti per funzionalità che superano il limite di quota come componenti aggiuntivi, una volta che finalizziamo i prezzi.',
  charge_notification_for_m2m_app_limit:
    'Hai raggiunto il tuo limite di quota machine-to-machine. Possiamo aggiungere addebiti per funzionalità che superano il limite di quota come componenti aggiuntivi, una volta che finalizziamo i prezzi.',
  paywall,
};

export default Object.freeze(upsell);
