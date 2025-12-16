/**
 * Props for the AgentBarLink.
 * @interface AgentBarLink
 * @property {string} label - Label displayed next to icon.
 * @property {string} [title] - Optional title applied on the link.
 * @property {string} [href] - Navigation link.
 * @property {() => void} [onClick] - Navigation link onClick handler.
 */
export interface AgentBarLink {
  label: string;
  title?: string;
  href?: string;
  onClick?: () => void;
}

/**
 * Props for the AgentBarInfo.
 * @interface AgentBarInfo
 * @property {string} label - Label visible on all screen sizes.
 * @property {string} extension - Visible above tablet screen size.
 */
export interface AgentBarInfo {
  label: string;
  extension: string;
}

/**
 * Props for the AgentBarItem.
 * @interface AgentBarProps
 * @property {AgentBarLink} telesalesLink - Telesales link
 * @property {AgentBarLink} appointmentLink - Appointment link
 * @property {AgentBarLink} logoutLink - Log out link
 * @property {string} userId - User ID
 * @property {AgentBarLink} agentId - Agent ID
 */
export interface AgentBarProps {
  telesalesLink: AgentBarLink;
  appointmentLink?: AgentBarLink;
  logoutLink: AgentBarLink;
  userId: string;
  agentId: AgentBarInfo;
  className?: string;
}
