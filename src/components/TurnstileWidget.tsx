import { NextPage } from 'next'
import Turnstile, { useTurnstile } from 'react-turnstile';

interface Props {
    onVerify: (token: string) => void
}

const TurnstileWidget: NextPage<Props> = ({ onVerify }) => {
    const turnstile = useTurnstile();
    return (
        <Turnstile
            sitekey={process.env.turnstileSiteKey!}
            onVerify={(token) => {
                onVerify(token);
            }}
            onExpire={() => {
                turnstile.reset();
            }}
        />
    );
}

export default TurnstileWidget