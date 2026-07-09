const themeLabels = {
  light: {
    current: "白天",
    action: "切换到暗色模式",
  },
  dark: {
    current: "暗色",
    action: "切换到白天模式",
  },
};

export function ThemeToggle({ theme, onToggle }) {
  const label = themeLabels[theme];
  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      type="button"
      aria-label={label.action}
      aria-pressed={isDark}
      title={label.action}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
      <span className="theme-toggle__text">
        <span>Theme</span>
        <strong>{label.current}</strong>
      </span>
    </button>
  );
}
