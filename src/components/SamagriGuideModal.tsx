import React, { useState } from 'react';
import { 
  BookOpen, 
  X, 
  Check, 
  Copy, 
  Printer, 
  Sparkles, 
  ShoppingBag,
  Flame
} from 'lucide-react';

interface SamagriGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SamagriItem {
  name: string;
  hindiName: string;
  qty: string;
  category: 'Pure Essentials' | 'Hawan & Agni' | 'Offerings & Flowers' | 'Utensils & Clothes';
}

const SAMAGRI_DATA: Record<string, SamagriItem[]> = {
  'Griha Pravesh & Vastu': [
    { name: 'Copper Kalash (तांबे का कलश)', hindiName: 'ताम्र कलश', qty: '1 or 2 pieces', category: 'Pure Essentials' },
    { name: 'Dry Coconut (सूखा नारियल/गोला)', hindiName: 'श्रीफल', qty: '3 pieces', category: 'Pure Essentials' },
    { name: 'Mango Leaves (आम के पत्ते)', hindiName: 'आम्रपल्लव', qty: '11 or 21 leaves', category: 'Offerings & Flowers' },
    { name: 'Navadhanya (नौ प्रकार के अनाज)', hindiName: 'नवधान्य', qty: '250 grams pack', category: 'Pure Essentials' },
    { name: 'Pure Cow Desi Ghee', hindiName: 'गौ घृत', qty: '1 kg', category: 'Hawan & Agni' },
    { name: 'Hawan Samagri Packet', hindiName: 'हवन सामग्री', qty: '500 grams', category: 'Hawan & Agni' },
    { name: 'Dry Mango Wood (आम की समिधा)', hindiName: 'समिधा', qty: '1 to 2 kg', category: 'Hawan & Agni' },
    { name: 'Kapur / Camphor (भीमसेनी कपूर)', hindiName: 'कर्पूर', qty: '100 grams', category: 'Hawan & Agni' },
    { name: 'Gangajal (गंगाजल)', hindiName: 'पवित्र गंगाजल', qty: '1 bottle', category: 'Pure Essentials' },
    { name: 'Roli & Chandan Paste', hindiName: 'रोली व चन्दन', qty: '1 small pack each', category: 'Pure Essentials' },
    { name: 'Akshat (साबुत चावल बिना टूटे)', hindiName: 'अक्षत', qty: '500 grams', category: 'Pure Essentials' },
    { name: 'Moli / Sacred Thread (मौली/कलावा)', hindiName: 'रक्षा सूत्र', qty: '2 rolls', category: 'Pure Essentials' },
    { name: 'Janeu / Sacred Thread (जनेऊ)', hindiName: 'यज्ञोपवीत', qty: '5 pairs', category: 'Pure Essentials' },
    { name: 'Betel Leaves & Supari (पान के पत्ते व सुपारी)', hindiName: 'ताम्बूल', qty: '11 leaves, 11 supari', category: 'Offerings & Flowers' },
    { name: 'Red & Yellow Cloth Pieces', hindiName: 'वस्त्र', qty: '1 meter each', category: 'Utensils & Clothes' },
  ],
  'Satyanarayan Katha': [
    { name: 'Atta / Wheat Flour for Panjiri', hindiName: 'पंजीरी आटा', qty: '500 grams', category: 'Offerings & Flowers' },
    { name: 'Pure Cow Milk & Curd', hindiName: 'दुग्ध व दधि', qty: '500 ml each', category: 'Pure Essentials' },
    { name: 'Honey & Sugar / Bura', hindiName: 'मधु व शर्करा', qty: '100 grams each', category: 'Pure Essentials' },
    { name: 'Tulsi Leaves (तुलसी दल)', hindiName: 'तुलसी पत्र', qty: '21 leaves', category: 'Offerings & Flowers' },
    { name: 'Banana Stems or Leaves (केले के खंभे)', hindiName: 'कदली स्तम्भ', qty: '2 or 4 stems', category: 'Offerings & Flowers' },
    { name: 'Yellow Cloth (पीला वस्त्र)', hindiName: 'पीत वस्त्र', qty: '1.25 meters', category: 'Utensils & Clothes' },
    { name: 'Assorted Fresh Flowers & Rose Garland', hindiName: 'पुष्पमाला', qty: '2 garlands', category: 'Offerings & Flowers' },
    { name: 'Seasonal Fruits (5 types)', hindiName: 'पंचफल', qty: '1 kg assorted', category: 'Offerings & Flowers' },
    { name: 'Dhoop & Agarbatti', hindiName: 'धूप बत्ती', qty: '1 box', category: 'Pure Essentials' },
    { name: 'Brass Diya & Cotton Wicks', hindiName: 'दीपक व बाती', qty: '2 diyas', category: 'Utensils & Clothes' },
  ],
  'Rudrabhishek': [
    { name: 'Fresh Bilva Patra (बेलपत्र 3-leaf sets)', hindiName: 'बिल्वपत्र', qty: '108 leaves', category: 'Offerings & Flowers' },
    { name: 'Bhasma / Sacred Vibhuti (भस्म)', hindiName: 'विभूति', qty: '50 grams', category: 'Pure Essentials' },
    { name: 'Sugarcane Juice (गन्ने का रस)', hindiName: 'इक्षु रस', qty: '500 ml', category: 'Pure Essentials' },
    { name: 'Gangajal & Pure Spring Water', hindiName: 'तीर्थ जल', qty: '2 litres', category: 'Pure Essentials' },
    { name: 'Dhatura Fruit & Flower (धतूरा)', hindiName: 'धत्तूर', qty: '2 pieces', category: 'Offerings & Flowers' },
    { name: 'Aak (Madar) White Flowers', hindiName: 'आक पुष्प', qty: '11 flowers', category: 'Offerings & Flowers' },
    { name: 'Attar / Natural Scent (इत्र)', hindiName: 'सुगंधित इत्र', qty: '1 small vial', category: 'Pure Essentials' },
    { name: 'White Sandalwood Paste (श्वेत चन्दन)', hindiName: 'श्वेत चन्दन', qty: '50 grams', category: 'Pure Essentials' },
    { name: 'Panchamrit preparation', hindiName: 'पंचामृत', qty: 'Milk, Curd, Ghee, Honey, Sugar', category: 'Pure Essentials' },
  ],
};

export const SamagriGuideModal: React.FC<SamagriGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedPuja, setSelectedPuja] = useState<keyof typeof SAMAGRI_DATA>('Griha Pravesh & Vastu');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentList = SAMAGRI_DATA[selectedPuja] || [];

  const toggleCheck = (name: string) => {
    setCheckedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleCopy = () => {
    const text = `॥ ऑनलाइन पंडित जी - ${selectedPuja} सामग्री सूची ॥\n\n` +
      currentList.map((item, i) => `${i + 1}. ${item.name} (${item.hindiName}) - ${item.qty}`).join('\n') +
      `\n\nGenerated via Online PanditJi (onlinepanditji.in)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-950 border border-emerald-900/60 rounded-3xl max-w-2xl w-full p-5 sm:p-8 text-stone-100 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-800">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl">
            🌿
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-white">
              Vedic Puja Samagri Checklist
            </h2>
            <p className="text-xs text-emerald-300">
              Complete scriptural item checklist to keep ready before the Pandit Ji arrives
            </p>
          </div>
        </div>

        {/* Puja selector pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(SAMAGRI_DATA).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSelectedPuja(key);
                setCheckedItems({});
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPuja === key
                  ? 'bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Action bar: Copy & Print */}
        <div className="flex items-center justify-between bg-stone-900/70 p-3 rounded-2xl border border-stone-800 mb-4 text-xs">
          <span className="text-stone-300">
            {Object.values(checkedItems).filter(Boolean).length} of {currentList.length} items collected
          </span>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1 font-semibold transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy List'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1 font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2 mb-6 max-h-96 overflow-y-auto pr-1">
          {currentList.map((item, idx) => {
            const isChecked = !!checkedItems[item.name];
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(item.name)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isChecked
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-stone-400 line-through'
                    : 'bg-stone-900/50 border-stone-800 text-stone-200 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isChecked
                        ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                        : 'border-stone-700 bg-stone-900'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white">{item.name}</div>
                    <div className="text-[11px] text-stone-400">{item.category}</div>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-amber-300 bg-stone-800/80 px-2 py-0.5 rounded-md shrink-0">
                  {item.qty}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
