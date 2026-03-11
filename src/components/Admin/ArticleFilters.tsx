interface ArticleFiltersProps {
  statusFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { value: 'all', label: 'Tous' },
  { value: 'published', label: 'Publiés' },
  { value: 'draft', label: 'Brouillons' },
];

const ArticleFilters = ({ statusFilter, onFilterChange }: ArticleFiltersProps) => {
  return (
    <div className="flex gap-1 bg-[#F3F4F6] rounded-lg p-0.5">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-3 py-1.5 text-xs font-inter font-medium rounded-md transition-all ${
            statusFilter === f.value
              ? 'bg-white text-[#010D3E] shadow-sm'
              : 'text-[#010D3E]/40 hover:text-[#010D3E]/60'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default ArticleFilters;
