import { Colors } from '@/constants/Colors';

const PosColors: { [key: string]: string } = {
    'NOUN': Colors.pastelPeach,
    'VERB': Colors.pastelSalmon,
    'ADJ': Colors.pastelLilac,
    'ADV': Colors.pastelLavender,
    'DET': Colors.pastelBeige,
    'PRON': Colors.pastelMint,
    'ADP': Colors.pastelYellow,
    'NUM': Colors.pastelOrange,
    'CCONJ': Colors.pastelTurquoise,
    'SCONJ': Colors.pastelPink,
    'PROPN': Colors.pastelGreen,
    'INTJ': Colors.pastelBlue,
    'AUX': Colors.pastelPurple,
};

export const getColorForPOS = (pos: string) => PosColors[pos] || Colors.white;
