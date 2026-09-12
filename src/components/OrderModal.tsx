import React, { useState } from 'react';
import { Truck, MapPin, CheckCircle2, X, Droplets, ArrowRight, Phone, MessageCircle, Mail } from 'lucide-react';
import { TANKER_MODELS } from '../data/mockData';
import { notifyNabaaBooking, TARGET_GMAIL } from '../services/gmail';
import { useLanguage } from '../context/LanguageContext';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTankerId?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, preselectedTankerId }) => {
  const [selectedTanker, setSelectedTanker] = useState<string>(preselectedTankerId || 'tanker-19t');
  const [deliveryMode, setDeliveryMode] = useState<'immediate' | 'scheduled'>('immediate');
  const [address, setAddress] = useState('Al-Malqa Villa, Ground Tank Inlet');
  const [phone, setPhone] = useState('+966 50 123 4567');
  const [hoseRequirement, setHoseRequirement] = useState('40m Standard Hose');
  const [step, setStep] = useState<'details' | 'dispatching' | 'confirmed'>('details');
  const [gmailNotified, setGmailNotified] = useState<boolean>(false);
  const [composeUrl, setComposeUrl] = useState<string>('');
  const { t, isRTL, language } = useLanguage();

  const phoneDisplay = '+966 53 043 4010';
  const phoneTel = '+966530434010';
  const whatsappDisplay = '+92 333 0717198';
  const whatsappLink = 'https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20would%20like%20to%20order%20a%20water%20tanker.';

  if (!isOpen) return null;

  const currentTanker = TANKER_MODELS.find(t => t.id === selectedTanker) || TANKER_MODELS[1];

  const handleConfirmOrder = async () => {
    setStep('dispatching');

    try {
      const res = await notifyNabaaBooking({
        bookingType: 'tanker_order',
        tankerSize: currentTanker.name,
        capacity: `${currentTanker.capacityTons} Tons (${currentTanker.capacityLiters.toLocaleString()} L)`,
        totalPrice: currentTanker.priceSAR,
        deliveryDistrict: address,
        hoseLength: hoseRequirement,
        senderPhone: phone,
        notes: `Order Mode: ${deliveryMode === 'immediate' ? 'Immediate Express (18 min)' : 'Scheduled Delivery'}`
      });
      setComposeUrl(res.composeUrl);
      setGmailNotified(true);
    } catch (e) {
      console.error('Failed to notify Gmail of tanker order:', e);
      setGmailNotified(true);
    }

    setTimeout(() => {
      setStep('confirmed');
    }, 1800);
  };

  const handleReset = () => {
    setStep('details');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#09162e] border border-cyan-500/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className={`absolute top-5 ${isRTL ? 'left-5' : 'right-5'} text-slate-400 hover:text-white p-2 cursor-pointer z-10`}
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-semibold uppercase tracking-wider border border-cyan-800 mb-2">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                <span>{language === 'ar' ? 'نموذج إرسال الطلب الفوري' : 'Simulated Order Dispatch'}</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                {language === 'ar' ? 'طلب صهريج مياه نقية صالحة للشرب' : 'Order Potable Water Tanker'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {language === 'ar'
                  ? 'اختر سعة الصهريج وموعد التوصيل وتفاصيل الخزان لمناطق الرياض والمناطق المحيطة.'
                  : 'Select your tanker capacity and dispatch preference for Riyadh & central districts.'}
              </p>
            </div>

            {/* Tanker Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                {language === 'ar' ? '1. اختر سعة الصهريج' : '1. Select Tanker Capacity'}
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {TANKER_MODELS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTanker(t.id)}
                    className={`p-3 rounded-2xl border ${isRTL ? 'text-right' : 'text-left'} transition-all cursor-pointer ${
                      selectedTanker === t.id
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[11px] font-mono text-cyan-400 font-bold">
                      {language === 'ar' ? `${t.capacityTons} طن` : `${t.capacityTons} Tons`}
                    </div>
                    <div className="text-xs font-bold text-white font-display truncate mt-0.5">
                      {language === 'ar' ? (t.capacityTons === 10 ? 'صهريج صغير' : t.capacityTons === 19 ? 'صهريج وسط' : 'صهريج كبير تريلا') : t.name}
                    </div>
                    <div className="text-[11px] font-mono font-bold text-slate-200 mt-1" dir="ltr">{t.priceSAR} SAR</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Immediate vs Scheduled */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                {language === 'ar' ? '2. وقت التوصيل' : '2. Delivery Timing'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryMode('immediate')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    deliveryMode === 'immediate'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {language === 'ar' ? '⚡ توصيل فوري عاجل (15-30 د)' : '⚡ Immediate Dispatch (15-30m)'}
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMode('scheduled')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    deliveryMode === 'scheduled'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {language === 'ar' ? '📅 حجز مسبق مجدول' : '📅 Schedule Ahead'}
                </button>
              </div>
            </div>

            {/* Address & Hose specifications */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  {language === 'ar' ? 'عنوان التوصيل وموقع الخزان' : 'Delivery Address'}
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={language === 'ar' ? 'حي الملقا، بوابة 2، خزان أرضي' : 'Al-Malqa Villa, Ground Tank Inlet'}
                    className="w-full bg-transparent border-none focus:outline-none text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    {language === 'ar' ? 'رقم جوال العميل' : 'Contact Mobile'}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    {language === 'ar' ? 'طول الخرطوم المطلوب' : 'Hose Requirement'}
                  </label>
                  <select
                    value={hoseRequirement}
                    onChange={(e) => setHoseRequirement(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="40m Standard Hose">{language === 'ar' ? '40 متر قياسي (خزان أرضي)' : '40m Standard (Ground Tank)'}</option>
                    <option value="50m High Reach">{language === 'ar' ? '50 متر مرتفع (خزان علوي)' : '50m Extended (Roof Tank)'}</option>
                    <option value="60m Industrial">{language === 'ar' ? '60 متر مزارع ومشاريع' : '60m Industrial Coupling'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Total & Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400">{language === 'ar' ? 'السعر الإجمالي' : 'Total Price'}</div>
                <div className="text-2xl font-mono font-black text-white" dir="ltr">{currentTanker.priceSAR} SAR</div>
              </div>
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 cursor-pointer flex items-center gap-2"
              >
                <span>{language === 'ar' ? 'تأكيد وإرسال الصهريج' : 'Confirm & Dispatch'}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{language === 'ar' ? 'تفضل الاتصال المباشر؟' : 'Prefer calling directly?'}</span>
              <div className="flex items-center gap-3">
                <a href={`tel:${phoneTel}`} className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold" dir="ltr">
                  <Phone className="w-3 h-3" />
                  <span>{phoneDisplay}</span>
                </a>
                <span>•</span>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold" dir="ltr">
                  <MessageCircle className="w-3 h-3" />
                  <span>{whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {step === 'dispatching' && (
          <div className="py-12 text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border-2 border-cyan-400 animate-spin border-t-transparent"></div>
              <Truck className="w-10 h-10 text-cyan-400" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-display">
                {language === 'ar' ? 'جارٍ البحث عن أقرب صهريج متاح' : 'Locating Nearest Available Tanker'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {language === 'ar'
                  ? `مطابقة الطلب مع صهريج مياه معتمد (${currentTanker.capacityTons} طن) في نطاق حيك السكني...`
                  : `Matching with verified ${currentTanker.name} (${currentTanker.capacityTons}T) in your district radius...`}
              </p>
            </div>
          </div>
        )}

        {step === 'confirmed' && (
          <div className="py-8 text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase font-bold">
                {language === 'ar' ? 'تم تأكيد الطلب #NB-9482' : 'Order #NB-9482 Confirmed'}
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                {language === 'ar' ? 'تم توجيه صهريج المياه إليك!' : 'Tanker Dispatched!'}
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                {language === 'ar'
                  ? 'السائق طارق المنصور (صهريج #402) قبل طلب التوصيل وهو في الطريق لموقعك الآن.'
                  : 'Driver Tariq Al-Mansoor (#402) has accepted your 19-ton delivery request and is en route.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-left space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">{language === 'ar' ? 'الوقت المتوقع للوصول' : 'Estimated Arrival'}</span>
                <span className="text-cyan-300 font-mono font-bold">{language === 'ar' ? '18 دقيقة' : '18 Minutes'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{language === 'ar' ? 'الإجمالي المستحق' : 'Total Charged'}</span>
                <span className="text-white font-mono font-bold" dir="ltr">{currentTanker.priceSAR} SAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{language === 'ar' ? 'طول الخرطوم' : 'Hose Reach'}</span>
                <span className="text-slate-300">{hoseRequirement}</span>
              </div>
            </div>

            {/* Gmail Notification Status */}
            <div className="max-w-sm mx-auto p-3 rounded-2xl bg-[#08152e] border border-cyan-500/40 text-left space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'إرسال تفاصيل الطلب للإدارة' : 'Operations Email Dispatched'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {language === 'ar' ? 'تم الإرسال' : 'Dispatched'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {language === 'ar' ? 'تم توجيه تفاصيل الطلب والموقع إلى' : 'Order specs & address routed to'} <strong className="text-white">{TARGET_GMAIL}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {composeUrl && (
                <a
                  href={composeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Gmail ({TARGET_GMAIL})</span>
                </a>
              )}

              <a
                href={`tel:${phoneTel}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2"
                dir="ltr"
              >
                <Phone className="w-4 h-4" />
                <span>Call ({phoneDisplay})</span>
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2"
                dir="ltr"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md shadow-cyan-500/20 font-bold"
              >
                {language === 'ar' ? 'العودة للرئيسية' : 'Back to Overview'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
