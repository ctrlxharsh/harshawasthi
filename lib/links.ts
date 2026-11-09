export function httpUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export function selectionFromParams(
  params: URLSearchParams,
): { kind: "project" | "research"; slug: string } | null {
  const project = params.get("project");
  const research = params.get("research");
  if (project) return { kind: "project", slug: project };
  if (research) return { kind: "research", slug: research };
  return null;
}
