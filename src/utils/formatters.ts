/**
 * 格式化货币显示
 * @param amount - 金额数值
 * @returns 格式化后的货币字符串 (如 $19.99)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * 格式化日期显示
 * @param dateString - 日期字符串
 * @returns 格式化后的日期 (如 Jan 5, 2023)
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * 截断长文本并添加省略号
 * @param text - 要截断的文本
 * @param maxLength - 最大长度
 * @returns 截断后的文本
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
