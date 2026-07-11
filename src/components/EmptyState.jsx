import { useId } from "react";

export function EmptyState({
  title = "未找到车手",
  description = "尝试调整搜索关键词或车队筛选。",
  actionLabel = "清除筛选",
  onAction,
}) {
  const emptyStateId = useId();
  const titleId = `${emptyStateId}-title`;
  const descriptionId = `${emptyStateId}-description`;

  return (
    <section
      className="empty-state"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <h2 className="empty-state__title" id={titleId}>
        {title}
      </h2>
      <p className="empty-state__description" id={descriptionId}>
        {description}
      </p>
      {onAction && actionLabel ? (
        <button
          className="empty-state__action"
          type="button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
