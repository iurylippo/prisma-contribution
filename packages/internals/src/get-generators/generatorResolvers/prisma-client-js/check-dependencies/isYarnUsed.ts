import { detect } from '@antfu/ni'

export async function isYarnUsed(baseDir: string): Promise<boolean> {
  const packageManager = await detect({ cwd: baseDir, autoInstall: false })
  return packageManager === 'yarn' || packageManager === 'yarn@berry'
}
