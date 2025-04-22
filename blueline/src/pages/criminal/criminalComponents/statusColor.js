export function getStatusColor(status) {
    return {
      Valid:     'text-green-600',
      Expired:   'text-red-600',
      Suspended: 'text-yellow-600',
    }[status] || 'text-gray-500';
}