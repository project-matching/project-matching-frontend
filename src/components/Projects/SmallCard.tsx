import styled from '@emotion/styled';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';

const SmallCard = () => {
  const CardContainer = styled.div`
    margin: 10px 0;
    height: 282px;
    border: 1px solid #d4d4d4;
    border-radius: 3px;
    padding: 20px;
  `;
  const Head = styled.div`
    margin-bottom: 20px;
  `;
  const Top = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `;

  const Author = styled.span`
    font-size: ${(props) => props.theme.sizes.sm};
  `;

  const H3 = styled.div`
    font-size: ${(props) => props.theme.sizes.lg};
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: 60px;
  `;
  const IconWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    > div {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  `;

  const Req = styled.div`
    margin-bottom: 20px;
    span {
      margin-right: 5px;
    }
  `;

  const View = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    > i {
      margin-right: 5px;
    }

    > span,
    > i {
      font-size: ${(props) => props.theme.sizes.sm};
    }
  `;

  const [isBookmarked, setBookmark] = useState(false);

  return (
    <CardContainer>
      <Head>
        <Top>
          <Author>작성자</Author>
          <i onClick={() => setBookmark(!isBookmarked)}>
            {isBookmarked ? (
              <FontAwesomeIcon icon={solid('bookmark')} />
            ) : (
              <FontAwesomeIcon icon={regular('bookmark')} />
            )}
          </i>
        </Top>
        <H3>Team-matching service for side project</H3>
      </Head>
      <Req>
        <IconWrapper>
          <div>
            <Image
              src="data:image/png;base64,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"
              alt="TypeScript"
              width="30px"
              height="30px"
              style={{
                borderRadius: '50%',
              }}
            />
          </div>
          <div>
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEUAeM/////y8vIAdM78+PQAds8AcM1/rN0yidN0qdz49vMAcs05jdUAb80Abcz29PNXndlcmNeVuOCcw+n4/P6QvOYAfdGCtOP0+PzY6fe61/CoyuuOt+Q9ktgmiNUcg9NnoNzm8vrQ5PVsp9/G3fLq7vGmxuXc5O7J2+vH2uu80+iixOTZ5O7q9PuyzudLlNaeveKyyZCWAAAOKElEQVR4nN2daWOiPBDHgzEoRAQXi+KBB8W21mO//6fboLbKkZMguP8Xz7MvqvBzJtdkMgFG3RpPw9ncX1jesh+tggAEwSrqLz1r4c9n4XRc+/NBjd99DGeT9SBwHBNjCBECdyEEIcam4wSD9WQWHmt8i7oIw1M8CLCJ4SNXmRAkfxUM4lNY05vUQRj6XgrHY8twppieXwelbsLpzAqGUnCPmMPAmk01v5FWws18hEysRPcjbKLRfKPzpfQRjudnYKoZL2dKE5zn+vpYXYTbGGvB+4HE8VbTm2khPPr9IdSGdxUc9n0tg4gGwrCnxzvzIt7a09C5Vibcerha38ISxl5lZ61I+L7U7p5ZweHyvUHC7WhYh3tmhYajSnasQBiOcL32+xHEowrtUZlwapnP4bswmpbyVEeRcOzD+vqXMmHoK04C1AjfI/OpfKnMSK3LUSEcx4pT62pCOFYxowLhDD3XQe/CcPYEwuN62BBfquFaeiYnS/geNGXAq3Ag2xolCSdOEy3wUciZ1Ei4aaALLcqMNnURzkDTBrwKAZkOR4LwrQ0GvMp8q4FwPGoPIEEcCQ+NooSbVbN9aF54tdFLuA2eN80WEwwE11RihDNu6Pr5QoITHCHCeZPTGLqGc12EfjsBCaKvh7BFo0ReIqMGn3DSXkCCyJ/CcQknbXXRq4ZcRB5hi130Kq6jcgj9tgMSRE53wyZs6TCRFWfQYBLOXgGQIDKHfhbhtm0zNZogawLHINwE7ZuqlQsFGxXC8epVTEiMuKIvpuiEo3Ytl9jCI3nC1g+EWdGHRRrh7LUACSKtQ6UQbpp+YQVtpAijV+lG70KRDGGr1xM0UdYZpYTvTtNvqySnNOBfRnh8maE+KxSUbduUEa5faSR8FF6LEc5e00dTOSVDRpFw/JouehUszt6KhPGr+mgqHPMJ318ZkCAW+tM84fgFx/pHoSjvp3nCFwjMsFUI2+QIp6+zJqQJTpmE1mu3wlTYYhGGr+6jqcyQQTh6fSclbjqiE25f30dT4S2V8L8wYd6Ij4TvrxEA5mv4TiFcvvZgfxdalhNu/xcTEiNuSwm9/6MVpoJeGWH4f3SkV+GwhLD3XxH2ioTHpl9Ks44FwpdfVGR1X2L8EvbbP1QgiLGDyX/I/9LD06w3Rv08YeuHCoidQbz4/vq4au9fjonTTxv/Dhg/hHGrhwqEQbxLXNu23R+l/+4kp16Ey8/OwThLOGZ2pAjWKw4fxOf9BaggwtlN9r1V2QEsPM4Qzln9DDpb9WrF/Hnx+tO2i3S/lK6d7Neo4K7mPEN4ZrVa/Ldr16nuiPF0HH2WWS9vy8Rf5Y4RoPMjIXu7EP9h/IQaZNMJEZ64XL4ro71b5ey4eSBkOmmDhCj47Ip/Tec7k6p9c9MrIctNGiSE0UHqyXayeHBVNLoTcmKITRHCfiLkoY9f9RndzYimv4SctISGCFHUkQVMe9bFb2u8Ji9cCDlR0mYIUXCQByTq7n+O9lwjpxfCgAnYECHeKz7VPvx4avBDGHLmpI0QYl/5oW5yy+cahjdCn7P2bYIQLSs807U9fP2VboQeZ+HUBKGp1ghvcjuXXATk3Qg5zbAJQtyr9ki3c7FicCXkhqAaIAykR8Kc3M4AXgNShPDEi188nxAvKj/RTciKxTxdCLmpCQ3YsFIrvMi1yaI+TVwghANehObphDAWn2/TvvMwIIZDg5TwyOtonk9oflZthfbuGqcKjoSQH+t+OmFQ0YR2Et/6FtLVAIFs4GcT8oYK9xoaoNq5+/m7TiSTb2BMWmdD54vlpLb7cfrb6/35/uqUQrr2270wF54QwjU3jvhswoD1t8n3IA0Hp1Fh5O07hTezP84PmYdwTQi5XWkaieKK/hvY/A9nCdGIbsJsMAaag32uydqnzJls0pmCMbcrBWA14KlPNbPtcT88yL4CnlB/rm6cqwyHsPXoqq5t5aJRwRhMRbJJEU/0zqEbQe6nsw8z9zQbuutir2ie7xM8+1CoGuBMQaglX5ZBKL3lg2gTGrt0fwyPfg3o538sQhgCPUdHdBKuKLNu91D+TWbv0hbtxCtBMWdgrmXrVyMh6lO+yaaNa8N0CmTvS2sD4TngLfDFpJPwTJnRuNRP9ElvQ6kNhH2w0LKtppEQxuVf5X5Sw0n467CkNDa4AFbbCEn/X+6kO6q3oQG1MAm0AC9II/haGgkpw6H9l96e6I9AHtCT6tUwIV1oCfoKHyt5LY2EbxRCbrSlVH0QqXys+Fr1E7qJUjJFBJg7zOKvVX9P07GZG9U0rYDAxFvkteofLTruXsVNg/YRohEthuGqHFjSw6d5TkP7KjdROtDTOhuSmTflq9Ior/T8pIVeCtAHdY3vfgxkHXXVvr6UGYhyE9nyqVH7xkOAv1kZUN3yVRJV/fbNachkmRnasxNLoo44mbW1bl4K0IoFmEYrvsRrwaNz+9YWZM3O23ly7c+zYL10srZo3fqQ0xBvjN1Pr5iOWCIYt2+Nz4hjZBkPi3w6YonIGr91cRoikz4iPjLayenMu5cI++2LtQGJTW7bJobELEjz1MJ4KZBJVHBt+3Oyol+TYr63MOYNGGvEcshkbwWUq26Godi+Bf+V9BICUy6p7doky/pMZyq098SXbkIAZBNq7O4hLrvSYCyyfygg7YSQsYlIERk/Jihnx3T/UGAPuAlCgGOF9Fn74GWHSBgL7eM3QijX29wZvzJbiPhNKBejGULgWPyDFkXZnd7D+HjJxdBydrQOQmB6Svl7ZAX52/Au+TT8nKimCAGWPI1wk32PdVxyorR0pvUQAoRPKp7q2re44zWvTUvZpJoIyZwkTpTMeD3VnGbri+SXNkkIcLDrqnQ4l9qdt/xSHV1NfYTku72DAmN3QqajMBTL826YEEDHUnDVLml9gWCuftOE5OuBL8/ojpy14HmL5gnTO0n+FLP0OIQJmAuemRF5gboJ08POfxK5ocP+2gqeexJQ/YTpQ8CbHGMienZN5OHPIEyHjkUi0a/eCatPvp9EmNrREh473I3oGVKRBz+LML252xM43X0x4Vj0HLDIY59HmN6gey5Jfy4hFD7LLaCnEqYd62DnchkfT6tXLt/9ZMKUcfXNYUyOwjUVBPR0wvTa7uCb6auJeF0MATVASGT2T4yKC5sMIbu2CV/NEBJfXVKLLiTTDGHV+jQNEaaMb5RT+zcT6qox1BghcdVBeTDnmCOsWCeqQUIAgzLEDyNPWK3WV5OEAJUcOXU3BcJq9doaJQRwUHhsMi0QVqu51ywhMP/mH/9rQl11E2sjFPswGuTd9FhCWKn2ZU2EOBDcGUO5px6MMsIqA0YthAj1Oh3Bv6WaUFcN2lr2ns6Hbsf+Furjc4liH0Y5YYU6wjXskAa3OedZwE/z7fBIIaxQC1o3IcK927rBPYj8eXZPPDFohOr1vHVnm5zvE+rujp8tkjujcaQSqhtRb+ZekFkUdXvcpphNK86YUFddfZ25+oVdCvfM860gk/x+ZBAqR061ESKc9qBZucmSU4zssaaUezBYhKpxRV2EeLUriRS6HaYVUeb8QsK+30J1iaGHEDmT8i0mgsjobpyvxw9tDDah4j0zOgiRuTzQQr2u+0bLsURmpq5CwrtnRvGuIB2EpQ56/57DoNS9cD9jwYIJdd33pIEQv7Fzn93On0KKJXZy24ruR4FH051dWtohL0XfTnbLoYkhQjAtee0MA2ufa7f5bqaUUOneNR2E8Mzdb7HtZP/H8jzP6i12X0mxCk/BR7XdnafFhuaOv92Slrnudmk1hg4lNJruP9Q0Hgrl6NNV4qPa7rDUNB4OqhUzKvFRbfeQarKhUk7pj/LTNSah9F2y2mZtAk2RpsJYzySU3VDUN/P+VEUsbYR0QtnkBX2EQCmllABuKCSa7uXWtz5EpbsQfNEAdd2trnMFHCmMGZRehk04ljkZrvWUbCSf3k3pZdiExkZi4Ncap4ErWUdNyq465hMaW3Ej6o21ISB37IkFyCQ0ZsIhYs3RRIR9iQKf1G6UT2jMRRG1x7xNieMkTEAOoXDYpoao/kB07GcD8ghFh8UadmYQfBPKCuYAcgmNiZCj1rK7hvt7bqIlYyAUJRRbZ9SzQ4rMMy/RkgsoQCjkqHXtcqNLoiU3s6sioeHzHRX3qAVmK2YqINz3D10KpACgEKHIoBF5NFVOk0cYnL8JZIGSPQ5KERoz5j111/cQKzCrCjlcWd+fya3Q9fXaNTFAQUJjSy29+DRBPAT9kbXwv0/7/en0vWNN1eQJjU2hQm8TQuhy+6FpmsNoI/jmooTGeNSmSy7NmP/GsoSyq/46hfBc/LUlCI2ZYA5W3cLBlv+ySoTGJmqDGc2lYB+jQEimcPyqPjULORO5V5YkNN7lqqVpF47e+S9ZidA4rrWUe1ETMSA95KSLkHQ4ZUVSniK5Lkad0BjHInXEtAthyRaoTkhaYwOdqhkpGFCZ0Bj78LmuioEv3QIrERrG1BKs66dDEL8p8lUgNIxwJFGDsoowtKTGeG2EZE0lXoNSXchZh1VeshIh6XKWpTXE9AkOl2odjC5CYkePXvCuOh/2KvJpICTtsQcoBe+qCZnAquSf2gjJTM7va3dWOIz8Cv3LXVoIibYx1mhIZOJ1Zfe8SRchmQTMz3q8FZrgfFIe/grSR0i0mY/Ir18Vz5tvdL6UVkKi6cwKeHVhqXR4COIZJS1GWboJU4W+F2BTChORvyfG09B1FlQHYarwFA9STG6wHEFsmsHSOtVBl6ouwlTHcDZZDwInva8Qwkx8/xraNR0nGKzfZqGWYYGiOgmvGk/D2dxfWN6yH62CAATBKuovPWvxdz4Lp/r6TJr+AfwHOhb8BoPVAAAAAElFTkSuQmCC"
              alt="TypeScript"
              width="30px"
              height="30px"
              style={{
                borderRadius: '50%',
              }}
            />
          </div>
          <div>
            <Image
              src="data:image/png;base64,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"
              alt="TypeScript"
              width="30px"
              height="30px"
              style={{
                borderRadius: '50%',
              }}
            />
          </div>
        </IconWrapper>
      </Req>
      <Req>
        <span>PM</span>
        <span>Designer</span>
      </Req>
      <Req>
        <span>프로젝트 인원: 4/8</span>
      </Req>
      <View>
        <i>
          <FontAwesomeIcon icon={solid('eye')} />
        </i>
        <span>23</span>
      </View>
    </CardContainer>
  );
};

export default SmallCard;
