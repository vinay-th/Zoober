import { TouchableOpacity, Text } from 'react-native';
import { ButtonProps } from '@/types/type';

const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case 'primary':
      return 'bg-[#0286FF] ';
    case 'secondary':
      return 'bg-[#F8F8F8] ';
    case 'danger':
      return 'bg-[#F56565] ';
    case 'outline':
      return 'bg-transparent border border-[0.5px]';
    case 'success':
      return 'bg-[#38A169] ';
    default:
      return 'bg-[#0286FF] ';
  }
};

const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
  switch (variant) {
    case 'primary':
      return 'text-white';
    case 'secondary':
      return 'text-[#0286FF]';
    case 'danger':
      return 'text-white';
    case 'success':
      return 'text-white';
    default:
      return 'text-white';
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = 'primary',
  textVariant = 'default',
  IconLeft,
  IconRight,
  className,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-[80%] rounded-full p-3 mb-10 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
