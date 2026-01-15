import '../lib/env'
import { generateYanderImage } from '../lib/replicate'

async function testYanderStyle() {
  console.log('Testing Yander style - grainy texture + sketchy edges...\n')
  
  const subject = 'A team building a bridge together'
  const context = 'people working collaboratively with construction tools'
  
  const imageRef = await generateYanderImage(
    subject,
    context,
    'yander-grainy-sketchy-test.jpg',
    'Test image - grainy with sketchy edges'
  )
  
  console.log('\n✓ Done!')
  console.log('Asset:', imageRef.asset._ref)
}

testYanderStyle().catch(console.error)
