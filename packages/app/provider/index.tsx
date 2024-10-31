import {ReactNode} from 'react'
import { GluestackUIProvider } from 'app/components/ui/gluestack-ui-provider'
import { SafeArea } from './safe-area'



export function Provider({ children }: { children: ReactNode }) {
  return(
    <GluestackUIProvider>
       <SafeArea>
        {children}
        </SafeArea>
    </GluestackUIProvider>
  )
}
